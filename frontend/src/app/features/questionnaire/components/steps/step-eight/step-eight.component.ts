import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-step-eight',
  imports: [
    FormsModule
  ],
  templateUrl: './step-eight.component.html',
  styleUrl: './step-eight.component.scss'
})
export class StepEightComponent implements OnInit, OnDestroy {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepEight: Pick<QuestionnaireModel, 'cream'> = {
    cream: ''
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | undefined) => {
            if (questionnaire) {
              this.stepEight = {
                cream: questionnaire.cream ? questionnaire.cream : ''
              };
              
              return;
            }

            this.stepEight = {
              cream: ''
            }
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepEight } }));
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
