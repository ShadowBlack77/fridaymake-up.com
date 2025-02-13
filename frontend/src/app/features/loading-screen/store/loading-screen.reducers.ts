import { createReducer, on } from "@ngrx/store";
import { LoadingScreenState } from "./loading-screen.state";
import { LoadingScreenActions } from "./loading-screen.actions";

export const LoadingScreenReducer = createReducer(
  LoadingScreenState.LOADING_SCREEN_INIT,
  on(LoadingScreenActions.showLoadingScreen, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(LoadingScreenActions.hideLoadingScreen, (state) => {
    return {
      ...state,
      isLoading: false
    }
  })
);