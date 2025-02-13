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

  export const selectQuestionnaireState = createFeatureSelector('questionnaire');
  export const selectQuestionnaire = createSelector(selectQuestionnaireState, (state: any) => {
    console.log(state);
    return state.questionnaire;
  });
  export const selectIsQuestionnaireSaved = createSelector(selectQuestionnaireState, (state: any) => {
    return state.isQuestionnaireSaved;
  })
}