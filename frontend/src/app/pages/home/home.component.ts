import { Component } from '@angular/core';
import { AnimationDirective, AnimationModel } from '@features';
import { FooterComponent } from '@shared';
import { RouterLink } from '@angular/router';
import { HomeAuthBtnComponent } from '@core';

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

  public animations: AnimationModel[] = [
    {
      delayLoading: 1.25,
      delayNormal: 0.25,
      top: 0,
      left: 0,
      topStart: 100
    },
    {
      delayLoading: 0.90,
      delayNormal: 0.45,
      top: 80,
      left: 0,
      topStart: 100
    },
    {
      delayLoading: 1.30,
      delayNormal: 0.65,
      top: 80,
      left: 0,
      topStart: 100
    },
    {
      delayLoading: 1.70,
      delayNormal: 0.85,
      top: 80,
      left: 0,
      topStart: 100
    },
    {
      delayLoading: 0.25,
      delayNormal: 0.25,
      top: 0,
      left: 80,
      topStart: 80
    },
    {
      delayLoading: 0.25,
      delayNormal: 0.25,
      top: 0,
      left: 0,
      topStart: 80
    },
    {
      delayLoading: 0.25,
      delayNormal: 0.25,
      top: 0,
      left: 0,
      topStart: 80
    },
    {
      delayLoading: 0.45,
      delayNormal: 0.45,
      top: 0,
      left: 0,
      topStart: 80
    },
    {
      delayLoading: 0.65,
      delayNormal: 0.65,
      top: 0,
      left: 0,
      topStart: 80
    },
    {
      delayLoading: 0.85,
      delayNormal: 0.85,
      top: 0,
      left: 0,
      topStart: 80
    },
    {
      delayLoading: 0.25,
      delayNormal: 0.25,
      top: 0,
      left: 0,
      topStart: 80
    },
    {
      delayLoading: 0.25,
      delayNormal: 0.25,
      top: 0,
      left: 0,
      topStart: 90
    },
  ]
}
