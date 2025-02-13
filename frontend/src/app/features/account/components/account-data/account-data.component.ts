import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Subject, switchMap, takeUntil, throwError } from 'rxjs';
import { AtuhState } from '../../../../core/auth/store/auth.state';
import { QuestionnaireState } from '../../../questionnaire/store/questionnaire.state';
import { QuestionnaireModel } from '../../../questionnaire/models';
import { HttpErrorResponse } from '@angular/common/http';

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

  private readonly authStore: Store<any> = inject(Store);
  private readonly questionnaireStore: Store = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public questionnaire: WritableSignal<QuestionnaireModel | null> = signal(null);
  public user: WritableSignal<any | null> = signal(null);

  ngOnInit(): void {
    this.authStore.select(AtuhState.selectUser).pipe(
      takeUntil(this.destroy$),
      switchMap((user: any | null) => {
        if (user) {
          this.user.set(user);
        }

        return this.questionnaireStore.select(QuestionnaireState.selectQuestionnaire).pipe(
          takeUntil(this.destroy$),
          map((questionnaire: QuestionnaireModel | null) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
