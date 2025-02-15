import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
  timestamps: true
})
export class EmailTokens {

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  readonly token: string;

  @Prop({
    type: Date,
    required: true
  })

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  })
  readonly user: Types.ObjectId;
}

export const EmailTokensSchema = SchemaFactory.createForClass(EmailTokens);