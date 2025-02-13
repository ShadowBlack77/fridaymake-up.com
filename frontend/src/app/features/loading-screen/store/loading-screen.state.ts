import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface LoadingScreenState {
  readonly isLoading: boolean;
}

export namespace LoadingScreenState {
  export const LOADING_SCREEN_INIT: LoadingScreenState = {
    isLoading: false
  }

  export const selectLoadingScreenState = createFeatureSelector('loadingScreen');
  export const selectLoadingScreen = createSelector(selectLoadingScreenState, (state: any) => {
    console.log(state);
    return state.isLoading;
  })
}