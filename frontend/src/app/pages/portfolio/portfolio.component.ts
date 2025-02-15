import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '@shared';
import gsap from 'gsap';

@Component({
  selector: 'app-portfolio',
  imports: [
    FooterComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {

  ngOnInit(): void {
    gsap.fromTo('#gallery', {
      opacity: 0,
    }, {
      opacity: 1
    });
  }
}
