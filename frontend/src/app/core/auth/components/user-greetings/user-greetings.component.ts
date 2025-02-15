import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthState } from '../../store/auth.state';
import { UserModel } from '../../models';

@Component({
  selector: 'app-user-greetings',
  imports: [],
  templateUrl: './user-greetings.component.html',
  styleUrl: './user-greetings.component.scss'
})
export class UserGreetingsComponent {

  private readonly store: Store<AuthState> = inject(Store);

  public currentUser: Signal<UserModel | undefined | null> = toSignal(this.store.select(AuthState.selectUser));
  
}
