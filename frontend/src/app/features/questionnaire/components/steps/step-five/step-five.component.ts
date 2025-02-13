import { Component, Host, inject, Input, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-step-five',
  imports: [
    FormsModule
  ],
  templateUrl: './step-five.component.html',
  styleUrl: './step-five.component.scss'
})
export class StepFiveComponent {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<any> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepFive: Pick<QuestionnaireModel, 'expectedEffect'> = {
    expectedEffect: ''
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | null) => {
            if (questionnaire) {
              this.stepFive = { ...questionnaire };

              return;
            }

            this.stepFive = {
              expectedEffect: ''
            }
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepFive } }));
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
