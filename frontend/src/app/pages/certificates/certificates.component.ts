import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '@shared';
import gsap from 'gsap';

@Component({
  selector: 'app-certificates',
  imports: [
    FooterComponent
  ],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent implements OnInit {

  ngOnInit(): void {
    gsap.fromTo('#certificates', {
      opacity: 0,
    }, {
      opacity: 1
    });
  }
}
