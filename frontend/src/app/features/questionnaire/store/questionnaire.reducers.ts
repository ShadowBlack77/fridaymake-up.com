import { createReducer, on } from "@ngrx/store";
import { QuestionnaireState } from "./questionnaire.state";
import { questionnaireActions } from "./questionnaire.actions";

export const QuestionnaireReducer = createReducer(
  QuestionnaireState.QUESTIONNAIRE_INIT,
  on(questionnaireActions.getQuestionnaire, (state) => {
    return {
      ...state
    }
  }),
  on(questionnaireActions.getQuestionnaireSuccessfully, (state, actions) => {
    return {
      ...state,
      questionnaire: actions.questionnaire
    }
  }),
  on(questionnaireActions.getQuestionnaireFailure, (state, actions) => {
    return {
      ...state
    }
  }),
  on(questionnaireActions.storeQuestionnaire, (state, actions) => {
    return {
      ...state,
      questionnaire: {
        ...state.questionnaire,
        ...actions.questionnaire
      }
    }
  }),
  on(questionnaireActions.saveQuestionnaire, (state, actions) => {
    return {
      ...state
    }
  }),
  on(questionnaireActions.saveQuestionnaireSuccessfully, (state, actions) => {
    return {
      ...state,
      questionnaire: actions.questionnaire
    }
  }),
  on(questionnaireActions.saveQuestionnaireFailure, (state, actions) => {
    return {
      ...state
    }
  }),
  on(questionnaireActions.updateQuestionnaire, (state, actions) => {
    return {
      ...state
    }
  }),
  on(questionnaireActions.updateQuestionnaireSuccessfully, (state, actions) => {
    return {
      ...state,
      questionnaire: actions.questionnaire
    }
  }),
  on(questionnaireActions.updateQuestionnaireFailure, (state, actions) => {
    return {
      ...state
    }
  }),
  on(questionnaireActions.removeQuestionnaire, (state, actions) => {
    return {
      ...state
    }
  }),
  on(questionnaireActions.removeQuestionnaireSuccessfully, (state, actions) => {
    return {
      ...state,
      questionnaire: undefined
    }
  }),
  on(questionnaireActions.removeQuestionnaireFailure, (state, actions) => {
    return {
      ...state
    }
  })
);