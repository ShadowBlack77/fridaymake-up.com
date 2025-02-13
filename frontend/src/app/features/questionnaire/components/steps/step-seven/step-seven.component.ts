import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-step-seven',
  imports: [
    FormsModule
  ],
  templateUrl: './step-seven.component.html',
  styleUrl: './step-seven.component.scss'
})
export class StepSevenComponent implements OnInit, OnDestroy {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<any> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}
  
  public stepSeven: Pick<QuestionnaireModel, 'makeUp'> = {
    'makeUp': ''
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | null) => {
            if (questionnaire) {
              this.stepSeven = { 
                makeUp: questionnaire.makeUp ? questionnaire.makeUp : ''
              };

              return;
            }

            this.stepSeven = {
              makeUp: ''
            }
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepSeven } }));
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
