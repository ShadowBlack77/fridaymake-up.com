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
  ShowQuestionnaireComponent, 
  SignInComponent, 
  SignUpComponent, 
  StatuteComponent,
  UpdateQuestionnaireComponent
} from '@pages';
import { 
  authGuard, 
  protectGuard, 
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
    { path: 'questionnaire', canActivate: [protectGuard], resolve: [questionnaireResolver, offersResolver, skinTypesResolver], component: CreateQuestionnaireComponent },
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
    { path: 'sign-up', component: SignUpComponent }
  ]}
];
