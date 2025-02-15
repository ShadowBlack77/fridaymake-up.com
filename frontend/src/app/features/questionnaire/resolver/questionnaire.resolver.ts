import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { questionnaireActions } from '../store/questionnaire.actions';
import { QuestionnaireState } from '../store/questionnaire.state';

export const questionnaireResolver: ResolveFn<boolean> = (route, state) => {

  const questionnaireStore: Store<QuestionnaireState> = inject(Store);

  questionnaireStore.dispatch(questionnaireActions.getQuestionnaire());

  return true;
};
