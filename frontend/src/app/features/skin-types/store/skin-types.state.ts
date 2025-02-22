import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SkinTypesModel } from "../models";

export interface SkinTypesState {
  readonly skinTypes: SkinTypesModel[];
}

export namespace SkinTypesState {
  export const SKIN_TYPES_INIT: SkinTypesState = {
    skinTypes: []
  }

  export const selectSkinTypesState = createFeatureSelector<SkinTypesState>('skinTypes');
  export const selectSkinTypes = createSelector(selectSkinTypesState, (state: SkinTypesState) => {
    return state.skinTypes
  });
}