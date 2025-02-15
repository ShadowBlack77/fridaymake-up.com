import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { authActions } from '../../../../core/auth/store/auth.actions';

@Component({
  selector: 'app-send-email-reset-password-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './send-email-reset-password-form.component.html',
  styleUrl: './send-email-reset-password-form.component.scss'
})
export class SendEmailResetPasswordFormComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>();
  private readonly authStotre: Store<AuthState> = inject(Store);

  public sendEmailResetPasswordForm: FormGroup;
  public error: WritableSignal<string | null> = signal(null);
  public submitted: WritableSignal<boolean> = signal(false);

  constructor(private readonly formBuilder: FormBuilder) {
    this.sendEmailResetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.authStotre.select(AuthState.selectError).pipe(
      takeUntil(this.destroy$),
      map((res) => {
        const error: string | null = res;

        this.error.set(error);
      })
    ).subscribe();
  }

  public onSubmit(): void {
    if (this.sendEmailResetPasswordForm.valid) {
      this.authStotre.dispatch(authActions.sendEmailResetPassword({ email: { ...this.sendEmailResetPasswordForm.value } }));
      this.sendEmailResetPasswordForm.reset();
      this.submitted.set(true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
