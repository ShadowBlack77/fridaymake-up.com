import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class QuestionnaireRequest {

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly _id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  readonly offers: {
    _id: string;
    name: string;
  };

  @IsNotEmpty()
  @IsBoolean()
  readonly allergy: boolean | number;

  @IsString()
  readonly allergyIngredients: string | null;

  @IsNotEmpty()
  @IsBoolean()
  readonly skinChanges: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly lenses: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly pores: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly medicines: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly skinDiseases: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly cosmeticsIngredients: boolean | number;

  @IsString()
  @IsOptional()
  readonly whichIngredients: string | null;

  @IsNotEmpty()
  @IsBoolean()
  readonly diseaseOne: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly diseaseTwo: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly diseaseThree: boolean | number;

  @IsNotEmpty()
  @IsBoolean()
  readonly skinShiny: boolean | number;

  @IsNotEmpty()
  readonly skinTypes: {
    _id: string;
    name: string;
  };

  @IsString()
  @IsOptional()
  readonly expectedEffect: string | null;
  
  @IsString()
  @IsOptional()
  readonly hairdo: string | null;

  @IsString()
  @IsOptional()
  readonly makeUp: string | null;

  @IsString()
  @IsOptional()
  readonly cream: string | null;

  @IsNotEmpty()
  @IsBoolean()
  readonly useAppearance: boolean | number;

  @IsNotEmpty()
  readonly selectedDate: Date;

  @IsNotEmpty()
  @IsString()
  readonly selectedHour: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly userId: string;

  @IsBoolean()
  @IsOptional()
  readonly isClosed: boolean;
}