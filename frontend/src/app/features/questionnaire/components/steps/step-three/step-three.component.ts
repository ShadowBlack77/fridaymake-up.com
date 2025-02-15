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
  selector: 'app-step-three',
  imports: [
    FormsModule
  ],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent implements OnInit, OnDestroy {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepThree: Pick<QuestionnaireModel, 'cosmeticsIngredients' | 'whichIngredients' | 'diseaseOne' | 'diseaseTwo'> = {
    cosmeticsIngredients: false,
    whichIngredients: '',
    diseaseOne: false,
    diseaseTwo: false
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | undefined) => {
            if (questionnaire) {
              this.stepThree = { 
                ...questionnaire,
                cosmeticsIngredients: questionnaire.cosmeticsIngredients ? questionnaire.cosmeticsIngredients : false,
                diseaseOne: questionnaire.diseaseOne ? questionnaire.diseaseOne : false,
                diseaseTwo: questionnaire.diseaseTwo ? questionnaire.diseaseTwo : false
              };

              return;
            }

            this.stepThree = { 
              cosmeticsIngredients: false,
              whichIngredients: '',
              diseaseOne: false,
              diseaseTwo: false
            };
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepThree } }));
    this.stepper.next();
  }

  public previous(): void {
    this.stepper.prev();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
