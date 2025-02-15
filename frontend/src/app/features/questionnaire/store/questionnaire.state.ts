import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionnaireModel } from "../models";

export interface QuestionnaireState {
  readonly questionnaire: QuestionnaireModel | undefined;
  readonly isQuestionnaireSaved: boolean;
}

export namespace QuestionnaireState {
  export const QUESTIONNAIRE_INIT: QuestionnaireState = {
    questionnaire: undefined,
    isQuestionnaireSaved: false
  }

  export const selectQuestionnaireState = createFeatureSelector<QuestionnaireState>('questionnaire');
  export const selectQuestionnaire = createSelector(selectQuestionnaireState, (state: QuestionnaireState) => {
    return state.questionnaire;
  });
  export const selectIsQuestionnaireSaved = createSelector(selectQuestionnaireState, (state: QuestionnaireState) => {
    return state.isQuestionnaireSaved;
  })
}