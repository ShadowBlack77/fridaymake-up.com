import { Component } from '@angular/core';
import { ContactDetailsComponent, QuestionnaireWrapperComponent, StepEightComponent, StepFiveComponent, StepFourComponent, StepNineComponent, StepOneComponent, StepSevenComponent, StepSixComponent, StepTenComponent, StepThreeComponent, StepTwoComponent, SummaryStepComponent } from '../../../features/questionnaire';
import { FooterComponent, StepperComponent, StepperDirective } from '../../../shared';

@Component({
  selector: 'app-create-questionnaire',
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
    FooterComponent,
],
  templateUrl: './create-questionnaire.component.html',
  styleUrl: './create-questionnaire.component.scss'
})
export class CreateQuestionnaireComponent {

}
