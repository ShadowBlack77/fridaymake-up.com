import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';
import { SkinTypesModel } from '../../models';
import { SkinTypesState } from '../../store/skin-types.state';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingScreenActions } from '../../../loading-screen/store/loading-screen.actions';

@Component({
  selector: 'app-skin-types-list',
  imports: [],
  templateUrl: './skin-types-list.component.html',
  styleUrl: './skin-types-list.component.scss'
})
export class SkinTypesListComponent implements OnInit, OnDestroy {

  private readonly skinTypesStore: Store<any> = inject(Store);
  private readonly loadingScreenStore: Store<any> = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public skinTypes: WritableSignal<SkinTypesModel[] | undefined> = signal(undefined);

  ngOnInit(): void {
    if (this.skinTypes.length === 0) {
      this.loadingScreenStore.dispatch(LoadingScreenActions.showLoadingScreen());
    }

    this.skinTypesStore.select(SkinTypesState.selectSkinTypes).pipe(
      takeUntil(this.destroy$),
      map((skinTypes) => {
        this.skinTypes.set(skinTypes);

        this.loadingScreenStore.dispatch(LoadingScreenActions.hideLoadingScreen());
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        this.loadingScreenStore.dispatch(LoadingScreenActions.hideLoadingScreen());

        return throwError(() => errorResponse);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
