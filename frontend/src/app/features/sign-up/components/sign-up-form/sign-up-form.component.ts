import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignUpState } from '../../store/sign-up.state';
import { signUpAcitons } from '../../store/sign-up.actions';
import { passwordComplexityValidator, passwordMatchValidator } from '../../validators';

@Component({
  selector: 'app-sign-up-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  private readonly signUpStore: Store<SignUpState> = inject(Store);

  public signUpForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordComplexityValidator()]],
      passwordConfirmation: ['', [Validators.required]]
    }, { 
      validators: passwordMatchValidator 
    });
  }

  public onSubmit(): void {
    if (this.signUpForm.valid) {
      this.signUpStore.dispatch(signUpAcitons.signUp({ signUp: { ...this.signUpForm.value } }));
    }
  }
}
