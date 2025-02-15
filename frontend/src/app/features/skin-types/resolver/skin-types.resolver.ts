import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { skinTypesActinos } from '../store/skin-types.actions';
import { SkinTypesState } from '../store/skin-types.state';

export const skinTypesResolver: ResolveFn<boolean> = (route, state) => {

  const skinTypesStore: Store<SkinTypesState> = inject(Store);

  skinTypesStore.dispatch(skinTypesActinos.loadSkinTypes());

  return true;
};
