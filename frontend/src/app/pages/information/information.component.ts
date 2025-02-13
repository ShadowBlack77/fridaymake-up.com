import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer';
import { SkinTypesListComponent } from '../../features/skin-types';

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
