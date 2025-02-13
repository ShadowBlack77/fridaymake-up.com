import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Offers {

  @Prop({
    type: String,
    required: [true, 'Name is required']
  })
  readonly name: string;

  @Prop({
    type: String,
    required: [true, 'Description is required']
  })
  readonly description: string;

  @Prop({
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    set: (value: number) => parseFloat(value.toFixed(2))
  })
  readonly price: number;
}

export const OffersSchema = SchemaFactory.createForClass(Offers);