import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
  timestamps: true
})
export class AuthSession {

  @Prop({
    type: String,
    unique: true
  })
  readonly authSessionId: string;

  @Prop({
    type: Date
  })
  readonly expiresAt: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true
  })
  readonly user: Types.ObjectId;
}

export const AuthSessionSchema = SchemaFactory.createForClass(AuthSession);