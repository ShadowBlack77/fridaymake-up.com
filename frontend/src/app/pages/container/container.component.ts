import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, AsideComponent } from '@shared';
import { AuthActionsComponent, EmailVerificationInfoComponent, UserGreetingsComponent } from '@core';

@Component({
  selector: 'app-container',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsideComponent,
    AuthActionsComponent,
    UserGreetingsComponent,
    EmailVerificationInfoComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
