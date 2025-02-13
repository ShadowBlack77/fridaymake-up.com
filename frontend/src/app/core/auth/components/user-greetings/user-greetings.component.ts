import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AtuhState } from '../../store/auth.state';

@Component({
  selector: 'app-user-greetings',
  imports: [],
  templateUrl: './user-greetings.component.html',
  styleUrl: './user-greetings.component.scss'
})
export class UserGreetingsComponent {

  private readonly store: Store<any> = inject(Store);

  public currentUser: Signal<any | undefined | null> = toSignal(this.store.select(AtuhState.selectUser));
  
}
