import { Component } from '@angular/core';
import { FooterComponent } from '@shared';
import { SkinTypesListComponent } from '@features';

@Component({
  selector: 'app-information',
  imports: [
    FooterComponent,
    SkinTypesListComponent
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {

}
