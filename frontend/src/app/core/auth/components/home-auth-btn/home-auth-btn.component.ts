import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';
import { AtuhState } from '../../store/auth.state';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-auth-btn',
  imports: [
    RouterLink
  ],
  templateUrl: './home-auth-btn.component.html',
  styleUrl: './home-auth-btn.component.scss'
})
export class HomeAuthBtnComponent {

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
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
