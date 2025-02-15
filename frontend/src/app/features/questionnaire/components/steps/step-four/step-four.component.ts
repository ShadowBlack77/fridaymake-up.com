import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { SkinTypesModel } from '../../../../skin-types';
import { SkinTypesState } from '../../../../skin-types/store/skin-types.state';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-step-four',
  imports: [
    FormsModule
  ],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.scss'
})
export class StepFourComponent implements OnInit, OnDestroy {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  public skinTypes: Signal<SkinTypesModel[] | undefined> = toSignal(this.questionnaireStore.select(SkinTypesState.selectSkinTypes));
  
  constructor(@Host() private readonly stepper: StepperComponent) {}

  public stepFour: Pick<QuestionnaireModel, 'diseaseThree' | 'skinShiny' | 'skinTypes'> = {
    diseaseThree: false,
    skinShiny: false,
    skinTypes: {
      _id: '',
      name: ''
    }
  }

  ngOnInit(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | undefined) => {
            if (questionnaire) {
              this.stepFour = { 
                ...questionnaire,
                diseaseThree: questionnaire.diseaseThree ? questionnaire.diseaseThree : false,
                skinShiny: questionnaire.skinShiny ? questionnaire.skinShiny : false,
                skinTypes: questionnaire.skinTypes ? { ...questionnaire.skinTypes } : {  _id: '', name: ''  }
              };

              return;
            }

            this.stepFour = { 
              diseaseThree: false,
              skinShiny: false,
              skinTypes: { _id: '', name: '' }
            };
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.stepFour } }));
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
