import { Component } from '@angular/core';
import { FooterComponent } from '@shared';
import { OffersListComponent } from '@features';

@Component({
  selector: 'app-price-list',
  imports: [
    FooterComponent,
    OffersListComponent
  ],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss'
})
export class PriceListComponent {

}
