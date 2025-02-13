import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { map, Subject, switchMap, take, takeUntil } from 'rxjs';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-step-ten',
  imports: [
    FormsModule
  ],
  templateUrl: './step-ten.component.html',
  styleUrl: './step-ten.component.scss'
})
export class StepTenComponent implements OnInit, OnDestroy {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<any> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepTen: Pick<QuestionnaireModel, 'useAppearance'> = {
    useAppearance: false
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | null) => {
            if (questionnaire) {
              this.stepTen = {
                useAppearance: questionnaire.useAppearance ? questionnaire.useAppearance : false
              }

              return;
            }

            this.stepTen = {
              useAppearance: false
            }
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepTen } }));
    
    this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
      take(1),
      map((questionnaire: QuestionnaireModel | null) => {
        if (this.stepType === 'new') {
          this.questionnaireStore.dispatch(questionnaireActions.saveQuestionnaire({ questionnaire }));
        } else {
          this.questionnaireStore.dispatch(questionnaireActions.updateQuestionnaire({ questionnaire }));
        }
      })
    ).subscribe();
  }

  public previous(): void {
    this.stepper.prev();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
