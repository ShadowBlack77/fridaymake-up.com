import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';
import { QuestionnaireModel } from '../../../models';
import { QuestionnaireState } from '../../../store/questionnaire.state';
import { questionnaireActions } from '../../../store/questionnaire.actions';

@Component({
  selector: 'app-questionnaire-list',
  imports: [],
  templateUrl: './questionnaire-list.component.html',
  styleUrl: './questionnaire-list.component.scss'
})
export class QuestionnaireListComponent implements OnInit, OnDestroy {

  private readonly questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public questionnaire: WritableSignal<QuestionnaireModel | null> = signal(null);

  ngOnInit(): void {
    this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
      takeUntil(this.destroy$),
      map((questionnaire: QuestionnaireModel | undefined) => {
        if (questionnaire) {
          this.questionnaire.set(questionnaire);
        }
      })
    ).subscribe();
  }

  public removeQuestionnaire(questionnaireId: string): void {
    this.questionnaireStore.dispatch(questionnaireActions.removeQuestionnaire({ questionnaireId }));
  }

  public parseDate(currentDate: Date | string): string {
    const newDate = new Date(currentDate);

    return `${newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate() }-${(newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1}-${newDate.getFullYear()}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
