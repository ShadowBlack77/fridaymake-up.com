import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionnaireModel } from "../models";

export interface QuestionnaireState {
  readonly questionnaire: QuestionnaireModel | undefined;
}

export namespace QuestionnaireState {
  export const QUESTIONNAIRE_INIT: QuestionnaireState = {
    questionnaire: undefined
  }

  export const selectQuestionnaireState = createFeatureSelector('offers');
  export const selectQuestionnaire = createSelector(selectQuestionnaireState, (state: any) => {
    console.log(state);
    return state.questionnaire;
  })
}