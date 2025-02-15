import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { QuestionnaireModel } from "../models";

export const questionnaireActions = createActionGroup({
  source: 'questionnaire',
  events: {
    'Get Questionnaire': emptyProps(),
    'Get Questionnaire Successfully': props<{ questionnaire: QuestionnaireModel }>(),
    'Get Questionnaire Failure': props<{ errors: string }>(),
    'Store Questionnaire': props<{ questionnaire: QuestionnaireModel }>(),
    'Store Questionnaire Successfully': props<{ questionnaire: QuestionnaireModel }>(),
    'Store Questionnaire Failure': props<{ errors: string }>(),
    'Save Questionnaire': props<{ questionnaire: QuestionnaireModel }>(),
    'Save Questionnaire Successfully': props<{ questionnaire: QuestionnaireModel }>(),
    'Save Questionnaire Failure': props<{ errors: string }>(),
    'Update Questionnaire': props<{ questionnaire: QuestionnaireModel }>(),
    'Update Questionnaire Successfully': props<{ questionnaire: QuestionnaireModel }>(),
    'Update Questionnaire Failure': props<{ errors: string }>(),
    'Remove Questionnaire': props<{ questionnaireId: string }>(),
    'Remove Questionnaire Successfully': emptyProps(),
    'Remove Questionnaire Failure': props<{ error: string }>()
  }
})