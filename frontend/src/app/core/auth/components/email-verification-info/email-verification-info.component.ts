import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.state';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';
import { UserModel } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-verification-info',
  imports: [],
  templateUrl: './email-verification-info.component.html',
  styleUrl: './email-verification-info.component.scss'
})
export class EmailVerificationInfoComponent implements OnInit, OnDestroy {

  private readonly authStore: Store<AuthState> = inject(Store);
  private readonly destroy$: Subject<void> = new Subject();

  public currentUser: WritableSignal<UserModel | undefined | null> = signal(null);

  ngOnInit(): void {
    this.authStore.select(AuthState.selectUser).pipe(
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
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
