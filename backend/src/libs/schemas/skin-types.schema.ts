import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class SkinTypes {

  @Prop({
    type: String,
    required: [true, 'Name cannot be empty']
  })
  readonly name: string;

  @Prop({
    type: String,
    required: [true, 'Description cannot be empty']
  })
  readonly description: string;
}

export const SkinTypesSchema = SchemaFactory.createForClass(SkinTypes);