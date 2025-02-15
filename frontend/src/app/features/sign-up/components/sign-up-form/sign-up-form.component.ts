import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignUpState } from '../../store/sign-up.state';
import { signUpAcitons } from '../../store/sign-up.actions';
import { passwordComplexityValidator, passwordMatchValidator } from '../../validators';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent implements OnInit, OnDestroy {

  private readonly signUpStore: Store<SignUpState> = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public signUpForm: FormGroup;
  public errors: WritableSignal<string | null> = signal(null);

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

  ngOnInit(): void {
    this.signUpStore.select(SignUpState.selectSignUpState).pipe(
      takeUntil(this.destroy$),
      map((res: { error: string | null }) => {
        this.errors.set(res.error);
      })
    ).subscribe();
  }

  public onSubmit(): void {
    if (this.signUpForm.valid) {
      this.signUpStore.dispatch(signUpAcitons.signUp({ signUp: { ...this.signUpForm.value } }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
