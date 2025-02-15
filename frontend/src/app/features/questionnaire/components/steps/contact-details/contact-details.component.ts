import { Component, Host, inject, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StepperComponent, StepperService } from '../../../../../shared';
import { QuestionnaireModel } from '../../../models';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { OffersModel } from '../../../../offers';
import { OffersState } from '../../../../offers/store/offers.state';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-contact-details',
  imports: [
    FormsModule
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  @Input() stepType: string = 'new';

  private readonly questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly offersStore: Store<OffersState> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly questionnaire: Signal<QuestionnaireModel | null | undefined> = toSignal(this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire));
  private readonly destroy$: Subject<void> = new Subject<void>();

  public offers: Signal<OffersModel[] | undefined> = toSignal(this.offersStore.select(OffersState.selectOffers));

  constructor(@Host() private readonly stepper: StepperComponent) {}

  public contactDetails: Pick<QuestionnaireModel, 'name' | 'email' | 'phoneNumber' | 'offers'> = {
    name: '',
    email: '',
    phoneNumber: '',
    offers: {
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
              this.contactDetails = { 
                ...questionnaire!,
              };

              return;
            }

            this.contactDetails = { 
              name: '',
              email: '',
              phoneNumber: '',
              offers: { _id: '', name: '' }
            };
          })
        )
      })
    ).subscribe();
  }

  public submitted(): void {
    this.questionnaireStore.dispatch(questionnaireActions.storeQuestionnaire({ questionnaire: { ...this.questionnaire()!, ...this.contactDetails } }));
    this.stepper.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
