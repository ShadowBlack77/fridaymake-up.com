import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { skinTypesActinos } from '../store/skin-types.actions';

export const skinTypesResolver: ResolveFn<boolean> = (route, state) => {

  const skinTypesStore: Store<any> = inject(Store);

  skinTypesStore.dispatch(skinTypesActinos.loadSkinTypes());

  return true;
};
