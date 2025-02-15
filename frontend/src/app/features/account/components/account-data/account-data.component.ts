import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { QuestionnaireState } from '../../../questionnaire/store/questionnaire.state';
import { QuestionnaireModel } from '@features';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '@core';
import { authActions } from '../../../../core/auth/store/auth.actions';

@Component({
  selector: 'app-account-data',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './account-data.component.html',
  styleUrl: './account-data.component.scss'
})
export class AccountDataComponent implements OnInit, OnDestroy {

  private readonly authStore: Store<AuthState> = inject(Store);
  private readonly questionnaireStore: Store = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public questionnaire: WritableSignal<QuestionnaireModel | null> = signal(null);
  public user: WritableSignal<UserModel | null> = signal(null);
  public emailVerificationButton: WritableSignal<string> = signal('Zweryfikuj');
  public disableVerificationButton: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.authStore.select(AuthState.selectUser).pipe(
      takeUntil(this.destroy$),
      switchMap((user: UserModel | null) => {
        if (user) {
          this.user.set(user);
        }

        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | undefined) => {
            if (questionnaire) {
              this.questionnaire.set(questionnaire);
            }
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return throwError(() => errorResponse);
          })
        )
      })
    ).subscribe();
  }

  public sendEmailVerification(): void {
    this.authStore.dispatch(authActions.sendEmailVerification());
    this.emailVerificationButton.set('Wysłano wiadomość');
    this.disableVerificationButton.set(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
