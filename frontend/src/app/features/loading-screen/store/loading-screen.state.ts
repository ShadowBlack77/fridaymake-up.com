import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface LoadingScreenState {
  readonly isLoading: boolean;
}

export namespace LoadingScreenState {
  export const LOADING_SCREEN_INIT: LoadingScreenState = {
    isLoading: false
  }

  export const selectLoadingScreenState = createFeatureSelector<LoadingScreenState>('loadingScreen');
  export const selectLoadingScreen = createSelector(selectLoadingScreenState, (state: LoadingScreenState) => {
    return state.isLoading;
  })
}