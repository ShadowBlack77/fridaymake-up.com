import { Component } from '@angular/core';
import { 
  ContactDetailsComponent, 
  QuestionnaireWrapperComponent, 
  StepEightComponent, 
  StepFiveComponent, 
  StepFourComponent, 
  StepNineComponent, 
  StepOneComponent, 
  StepSevenComponent, 
  StepSixComponent, 
  StepTenComponent, 
  StepThreeComponent, 
  StepTwoComponent, 
  SummaryStepComponent 
} from '@features';
import { 
  FooterComponent, 
  StepperComponent, 
  StepperDirective 
} from '@shared';

@Component({
  selector: 'app-update-questionnaire',
  imports: [
    QuestionnaireWrapperComponent,
    StepperComponent,
    StepperDirective,
    ContactDetailsComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    StepSevenComponent,
    StepEightComponent,
    StepNineComponent,
    StepTenComponent,
    SummaryStepComponent,
    FooterComponent
  ],
  templateUrl: './update-questionnaire.component.html',
  styleUrl: './update-questionnaire.component.scss'
})
export class UpdateQuestionnaireComponent {

}
