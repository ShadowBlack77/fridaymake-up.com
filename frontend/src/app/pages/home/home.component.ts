import { Component } from '@angular/core';
import { AnimationDirective } from '../../features';
import { FooterComponent } from '../../shared/footer';
import { RouterLink } from '@angular/router';
import { HomeAuthBtnComponent } from '../../core/auth';

@Component({
  selector: 'app-home',
  imports: [
    AnimationDirective,
    FooterComponent,
    RouterLink,
    HomeAuthBtnComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
