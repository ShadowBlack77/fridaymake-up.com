import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionnaireModel } from '../../../models';
import { StepperComponent, StepperService } from '../../../../../shared';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-step-nine',
  imports: [
    FormsModule
  ],
  templateUrl: './step-nine.component.html',
  styleUrl: './step-nine.component.scss'
})
export class StepNineComponent implements OnInit, OnDestroy {
  
  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<any> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepNine: Pick<QuestionnaireModel, 'selectedDate' | 'selectedHour'> = {
    selectedDate: new Date(),
    selectedHour: '00:00:00'
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | null) => {
            if (questionnaire) {
              this.stepNine = {
                selectedDate: questionnaire.selectedDate ? questionnaire.selectedDate : new Date(),
                selectedHour: questionnaire.selectedHour ? questionnaire.selectedHour : '00:00:00'
              }

              return;
            }

            this.stepNine = {
              selectedDate: new Date(),
              selectedHour: '00:00:00'
            }
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepNine } }));
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
