import { Component, Input } from '@angular/core';
import { ResetPasswordFormComponent } from '@features';

@Component({
  selector: 'app-reset-password',
  imports: [
    ResetPasswordFormComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  @Input() sessionId!: string;
}
