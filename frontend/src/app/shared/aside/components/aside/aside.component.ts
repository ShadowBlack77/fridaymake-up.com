import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsideDirective } from '../../directives';

@Component({
  selector: 'app-aside',
  imports: [
    RouterLink,
    AsideDirective
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AsideComponent {

}
