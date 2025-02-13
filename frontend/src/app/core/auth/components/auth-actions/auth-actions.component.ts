import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';
import { AtuhState } from '../../store/auth.state';
import { HttpErrorResponse } from '@angular/common/http';
import { authActions } from '../../store/auth.actions';

@Component({
  selector: 'app-auth-actions',
  imports: [
    RouterLink
  ],
  templateUrl: './auth-actions.component.html',
  styleUrl: './auth-actions.component.scss'
})
export class AuthActionsComponent implements OnInit, OnDestroy {

  private readonly authStore: Store<any> = inject(Store);
  private destroy$: Subject<void> = new Subject();

  public currentUser: WritableSignal<any | undefined | null> = signal(null);

  ngOnInit(): void {
    this.authStore.select(AtuhState.selectUser).pipe(
      takeUntil(this.destroy$),
      map((res) => {
        this.currentUser.set(res);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        this.currentUser.set(null);

        return throwError(() => errorResponse);
      })
    ).subscribe();
  }

  
  public signOut(): void {
    this.authStore.dispatch(authActions.signOut());
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
