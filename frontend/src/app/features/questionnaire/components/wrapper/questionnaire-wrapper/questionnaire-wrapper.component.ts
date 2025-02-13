import { Component, inject, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StepperService } from '../../../../../shared';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-questionnaire-wrapper',
  imports: [],
  templateUrl: './questionnaire-wrapper.component.html',
  styleUrl: './questionnaire-wrapper.component.scss'
})
export class QuestionnaireWrapperComponent implements OnInit, OnDestroy {

  @Input() wrapperType: string = 'new';

  private readonly questionnaireStore: Store<any> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public readonly isQuestionnaireSaved: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.stepperService.loadStep(1);
    
    this.questionnaireStore.select(QuestionnaireState.selectIsQuestionnaireSaved).pipe(
      takeUntil(this.destroy$),
      map((isQuestionnaireSaved) => {
        this.isQuestionnaireSaved.set(isQuestionnaireSaved);
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
