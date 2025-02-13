import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AtuhState } from '../../../../core/auth/store/auth.state';

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

  public user: WritableSignal<any | null> = signal(null);

  ngOnInit(): void {
    // this.authStore.select(AtuhState.selectUser).pipe(
    //   takeUntil(this.destroy$),
    //   switchMap((user: any | null) => {
    //     if (user) {
    //       this.user.set(user);
    //     }
    //   })
    // ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
