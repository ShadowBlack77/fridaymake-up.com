import { createReducer, on } from "@ngrx/store";
import { SkinTypesState } from "./skin-types.state";
import { skinTypesActinos } from "./skin-types.actions";

export const SkinTypesReducer = createReducer(
  SkinTypesState.SKIN_TYPES_INIT,
  on(skinTypesActinos.loadSkinTypes, (state) => {
    return {
      ...state
    }
  }),
  on(skinTypesActinos.loadSkinTypesSuccessfully, (state, actions) => {
    return {
      ...state,
      skinTypes: actions.skinTypes
    }
  }),
  on(skinTypesActinos.loadSkinTypesFailure, (state) => {
    return {
      ...state
    }
  })
);