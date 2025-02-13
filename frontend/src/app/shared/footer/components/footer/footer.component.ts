import { CommonModule } from '@angular/common';
import { Component, Input, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input() footerStyle!: 'main' | 'dark';

  public currentYear: Signal<number> = signal(new Date().getFullYear());
  
}
