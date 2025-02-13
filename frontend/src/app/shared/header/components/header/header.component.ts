import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsideDirective } from '../../../aside';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsideDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
