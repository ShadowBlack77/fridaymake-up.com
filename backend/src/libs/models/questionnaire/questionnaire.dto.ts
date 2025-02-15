export class QuestionnaireDto {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly offers: {
    _id: string;
    name: string;
  };
  readonly allergy: boolean | number;
  readonly allergyIngredients: string | null;
  readonly skinChanges: boolean | number;
  readonly lenses: boolean | number;
  readonly pores: boolean | number;
  readonly medicines: boolean | number;
  readonly skinDiseases: boolean | number;
  readonly cosmeticsIngredients: boolean | number;
  readonly whichIngredients: string | null;
  readonly diseaseOne: boolean | number;
  readonly diseaseTwo: boolean | number;
  readonly diseaseThree: boolean | number;
  readonly skinShiny: boolean | number;
  readonly skinTypes: {
    _id: string;
    name: string;
  };
  readonly expectedEffect: string | null;
  readonly hairdo: string | null;
  readonly makeUp: string | null;
  readonly cream: string | null;
  readonly useAppearance: boolean | number;
  readonly selectedDate: Date;
  readonly selectedHour: string;
  readonly userId: string;
  readonly isClosed: boolean;
}