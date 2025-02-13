import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';
import { OffersModel } from '../../models';
import { OffersState } from '../../store/offers.state';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingScreenActions } from '../../../loading-screen/store/loading-screen.actions';

@Component({
  selector: 'app-offers-list',
  imports: [],
  templateUrl: './offers-list.component.html',
  styleUrl: './offers-list.component.scss'
})
export class OffersListComponent implements OnInit, OnDestroy {

  private readonly offersStore: Store<any> = inject(Store);
  private readonly loadingScreenStore: Store<any> = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public offers: WritableSignal<OffersModel[] | undefined> = signal(undefined);

  ngOnInit(): void {
    if (this.offers.length === 0) {
      this.loadingScreenStore.dispatch(LoadingScreenActions.showLoadingScreen());
    }

    this.offersStore.select(OffersState.selectOffers).pipe(
      takeUntil(this.destroy$),
      map((offers) => {
        this.offers.set(offers);

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
