import { Component } from '@angular/core';
import { FooterComponent } from '@shared';
import { QuestionnaireListComponent } from '@features';

@Component({
  selector: 'app-show-questionnaire',
  imports: [
    QuestionnaireListComponent,
    FooterComponent
  ],
  templateUrl: './show-questionnaire.component.html',
  styleUrl: './show-questionnaire.component.scss'
})
export class ShowQuestionnaireComponent {

}
