import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Questionnaire {

  @Prop({
    type: String,
    required: [true, 'Name is required']
  })
  readonly name: string;

  @Prop({
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true
  })
  readonly email: string;

  @Prop({
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    unique: true
  })
  readonly phoneNumber: string;

  @Prop({
    type: Boolean,
    required: [true, 'Allergy field is required']
  })
  readonly allergy: boolean;

  @Prop({
    type: String
  })
  readonly allergyIngredients: string;

  @Prop({
    type: Boolean,
    required: [true, 'Lenses field are required']
  })
  readonly lenses: boolean;

  @Prop({
    type: Boolean,
    required: [true, 'Pores field are required']
  })
  readonly pores: boolean;

  @Prop({
    type: Boolean,
    required: [true, 'Medicines field are required']
  })
  readonly medicines: boolean;

  @Prop({
    type: Boolean,
    required: [true, 'Skin diseases field are required']
  })
  readonly skinDiseases: boolean;

  @Prop({
    type: Boolean,
    required: [true, 'Cosmetic ingredients are required']
  })
  readonly cosmeticsIngredients: boolean;

  @Prop({
    type: String
  })
  readonly whichIngredients: string;

  @Prop({
    type: Boolean,
    required: [true, 'Disease one field is required']
  })
  readonly diseaseOne: boolean;

  @Prop({
    type: Boolean,
    required: [true, 'Disease two field is required']
  })
  readonly diseaseTwo: boolean;

  @Prop({
    type: Boolean,
    required: [true, 'Disease three field is required']
  })
  readonly diseaseThree: boolean;

  @Prop({
    type: Boolean,
    required: [true, 'Skin skiny field is required']
  })
  readonly skinShiny: boolean;

  @Prop({
    type: String
  })
  readonly expectedEffect: string;

  @Prop({
    type: String
  })
  readonly hairdo: string;

  @Prop({
    type: String
  })
  readonly makeUp: string;

  @Prop({
    type: String
  })
  readonly cream: string;

  @Prop({
    type: Boolean,
    required: [true, 'User appearance is required']
  })
  readonly useAppearance: boolean;

  @Prop({
    type: Date,
    required: [true, 'Selected date field is required']
  })
  readonly selectedDate: Date;

  @Prop({
    type: String,
    required: [true, 'Selected hour is required']
  })
  readonly selectedHour: string;

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isClosed: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  readonly user: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Offers',
    required: true
  })
  readonly offers: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'SkinTypes',
    required: true
  })
  readonly skinType: Types.ObjectId;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);