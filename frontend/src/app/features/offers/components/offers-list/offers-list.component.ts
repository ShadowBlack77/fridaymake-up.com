import { Component, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';
import { OffersModel } from '../../models';
import { OffersState } from '../../store/offers.state';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingScreenActions } from '../../../loading-screen/store/loading-screen.actions';
import { LoadingScreenState } from '../../../loading-screen/store/loading-screen.state';

@Component({
  selector: 'app-offers-list',
  imports: [],
  templateUrl: './offers-list.component.html',
  styleUrl: './offers-list.component.scss'
})
export class OffersListComponent implements OnInit, OnDestroy {

  private readonly offersStore: Store<OffersState> = inject(Store);
  private readonly loadingScreenStore: Store<LoadingScreenState> = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public offers: WritableSignal<OffersModel[] | undefined> = signal(undefined);
  public imgLinks: Signal<string[]> = signal([
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739555476/makijaz-biznesowy_e5red1.jpg',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739556132/makijaz-sylwestrowy_rxvxrv.jpg',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739556188/pakiet-slubny_bob9zz.jpg',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739556211/makijaz-wieczorowy_mrbztp.jpg',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739556251/makijaz-sceniczny_oqaaof.png',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739556290/makijaz-dzienny_juuybi.jpg',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739556317/sesje-zdjeciowe_ermtyu.jpg',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739555464/makijaz-artystyczny_aqxhwo.jpg',
    'https://res.cloudinary.com/dfv7maike/image/upload/v1739556330/makijaz-meski_cju9i7.jpg'
  ]);

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
