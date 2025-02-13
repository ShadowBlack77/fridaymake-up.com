import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer';
import { AccountDataComponent } from '../../../features/account';

@Component({
  selector: 'app-account-informations',
  imports: [
    FooterComponent,
    AccountDataComponent
  ],
  templateUrl: './account-informations.component.html',
  styleUrl: './account-informations.component.scss'
})
export class AccountInformationsComponent {

}
