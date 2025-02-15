import { Routes } from '@angular/router';
import { 
  AccountContainerComponent,
  AccountInformationsComponent,
  CertificatesComponent, 
  ContainerComponent, 
  CreateQuestionnaireComponent, 
  HomeComponent, 
  InformationComponent, 
  PortfolioComponent, 
  PriceListComponent, 
  ResetPasswordComponent, 
  SendResetEmailPasswordComponent, 
  ShowQuestionnaireComponent, 
  SignInComponent, 
  SignUpComponent, 
  StatuteComponent,
  UpdateQuestionnaireComponent
} from '@pages';
import { 
  authGuard, 
  emailVerificationGuard, 
  protectGuard, 
  sessionValidationGuard, 
  userResolver 
} from '@core';
import { 
  offersResolver, 
  skinTypesResolver, 
  questionnaireResolver, 
  questionnaireGuard
} from '@features';

export const routes: Routes = [
  { path: '', component: ContainerComponent, resolve: [userResolver], children: [
    { path: '', component: HomeComponent },
    { path: 'price-list', resolve: [offersResolver], component: PriceListComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'certificates', component: CertificatesComponent },
    { path: 'questionnaire', canActivate: [protectGuard, emailVerificationGuard], resolve: [questionnaireResolver, offersResolver, skinTypesResolver], component: CreateQuestionnaireComponent },
    { path: 'information', component: InformationComponent, resolve: [skinTypesResolver] },
    { path: 'statute', component: StatuteComponent },
    { path: 'account', canActivate: [protectGuard], resolve: [questionnaireResolver], component: AccountContainerComponent, children: [
      { path: '', component: AccountInformationsComponent },
      { path: 'questionnaire', canActivate: [questionnaireGuard], component: ShowQuestionnaireComponent },
      { path: 'questionnaire-update', canActivate: [questionnaireGuard], resolve: [offersResolver, skinTypesResolver], component: UpdateQuestionnaireComponent }
    ]}
  ]},
  { path: 'auth', canActivate: [authGuard], children: [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'send-reset-email-password', component: SendResetEmailPasswordComponent },
    { path: 'reset-password/:sessionId', canActivate: [sessionValidationGuard], component: ResetPasswordComponent }
  ]}
];
