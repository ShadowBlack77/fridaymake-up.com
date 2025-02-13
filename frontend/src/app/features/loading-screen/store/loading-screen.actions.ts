import { createActionGroup, emptyProps } from "@ngrx/store";

export const LoadingScreenActions = createActionGroup({
  source: 'LoadingScreen',
  events: {
    'Show loading screen': emptyProps(),
    'Show loading screen Successfully': emptyProps(),
    'Hide loading screen': emptyProps(),
    'Hide loading screen Successfully': emptyProps()
  }
});