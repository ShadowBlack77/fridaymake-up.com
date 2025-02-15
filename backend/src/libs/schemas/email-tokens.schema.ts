import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { EmailTokensTypes } from "../enums/email-types.enum";

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
  readonly expiresAt: Date;

  @Prop({
    type: String,
    required: true,
    enum: EmailTokensTypes,
    default: EmailTokensTypes.VERIFY_EMAIL
  })
  readonly emailType: EmailTokensTypes

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  })
  readonly user: Types.ObjectId;
}

export const EmailTokensSchema = SchemaFactory.createForClass(EmailTokens);