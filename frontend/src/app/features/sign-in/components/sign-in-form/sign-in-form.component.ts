import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { signInActions } from '../../store/sign-in.actions';
import { SignInState } from '../../store/sign-in.state';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent implements OnInit, OnDestroy {

  private readonly signInStore: Store<SignInState> = inject(Store);
  private readonly destroy$: Subject<void> = new Subject<void>();

  public signInForm: FormGroup;
  public error: WritableSignal<string | null> = signal(null);

  constructor(private readonly formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.signInStore.select(SignInState.selectSignInState).pipe(
      takeUntil(this.destroy$),
      map((res: { error: string | null }) => {
        this.error.set(res.error);
      })
    ).subscribe();
  }

  public onSubmit(): void {
    this.signInStore.dispatch(signInActions.signIn({ signIn: { ...this.signInForm.value } }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
