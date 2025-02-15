import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { passwordComplexityValidator, passwordMatchValidator } from '../../../sign-up/validators';
import { authActions } from '../../../../core/auth/store/auth.actions';

@Component({
  selector: 'app-reset-password-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.scss'
})
export class ResetPasswordFormComponent {

  @Input() sessionId!: string;

  private readonly authStore: Store<AuthState> = inject(Store);

  public resetPasswordForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, passwordComplexityValidator()]],
      newPasswordConfirmation: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator
    });
  }

  public onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.authStore.dispatch(authActions.resetPassword({ newPassword: { ...this.resetPasswordForm.value }, sessionId: this.sessionId }));
    }
  }
}
