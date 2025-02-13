import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared';
import { AsideComponent } from '../../shared/aside';
import { AuthActionsComponent, UserGreetingsComponent } from '../../core/auth';

@Component({
  selector: 'app-container',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsideComponent,
    AuthActionsComponent,
    UserGreetingsComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
