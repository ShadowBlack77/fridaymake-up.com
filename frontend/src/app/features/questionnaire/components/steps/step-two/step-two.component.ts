import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { questionnaireActions } from '../../../store/questionnaire.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  imports: [
    FormsModule
  ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent implements OnInit, OnDestroy {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepTwo: Pick<QuestionnaireModel, 'pores' | 'medicines' | 'skinDiseases'> = {
    pores: false,
    medicines: false,
    skinDiseases: false
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | undefined) => {
            if (questionnaire) {
              this.stepTwo = { 
                ...questionnaire,
                pores: questionnaire.pores ? questionnaire.pores : false,
                medicines: questionnaire.medicines ? questionnaire.medicines : false,
                skinDiseases: questionnaire.skinDiseases ? questionnaire.skinDiseases : false
              };

              return;
            }

            this.stepTwo = { 
              pores: false,
              medicines: false,
              skinDiseases: false
            };
          })
        )
      })
    )
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepTwo } }));
    this.stepper.next();
  }

  public prev(): void {
    this.stepper.prev();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
