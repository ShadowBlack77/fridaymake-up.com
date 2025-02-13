import { inject, Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { QuestionnaireService } from "../services";
import { AuthService } from "../../../core/auth";
import { Store } from "@ngrx/store";

@Injectable()
export class QuestionnaireEffects {

  private readonly actions$: Actions = inject(Actions);
  private readonly questionnaireService: QuestionnaireService = inject(QuestionnaireService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly questionnaireStore: Store<any> = inject(Store);

  
}