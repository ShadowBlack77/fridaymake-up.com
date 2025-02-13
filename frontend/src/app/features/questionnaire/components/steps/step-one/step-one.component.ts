import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-step-one',
  imports: [
    FormsModule
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent implements OnInit, OnDestroy {
  
  @Input() stepType: string = 'new';

  private readonly store: Store<any> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.store.select(QuestionnaireState.selectQuestionnaire));

  private destroy$: Subject<void> = new Subject<void>();

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepOne: Pick<QuestionnaireModel, 'allergy' | 'allergyIngredients' | 'skinChanges' | 'lenses'> = {
    allergy: false,
    allergyIngredients: '',
    lenses: false,
    skinChanges: false
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.store.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | null | undefined) => {
            if (questionnaire) {
              this.stepOne = { 
                ...questionnaire, 
                allergy: questionnaire.allergy ? questionnaire.allergy : false,
                skinChanges: questionnaire.skinChanges ? questionnaire.skinChanges : false,
                lenses: questionnaire.lenses ? questionnaire.lenses : false
              };

              return;
            }

            this.stepOne = {
              allergy: false,
              allergyIngredients: '',
              skinChanges: false,
              lenses: false
            }
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.store.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepOne } }));
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
