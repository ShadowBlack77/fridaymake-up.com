import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "../enums";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

  @Prop({ 
    type: String, 
    required: [true, 'Username is required'], 
    trim: true, 
    unique: true 
  })
  readonly username: string;

  @Prop({ 
    type: String, 
    required: [true, 'Email is required'], 
    trim: true, 
    unique: true, 
    lowercase: true 
  })
  readonly email: string;

  @Prop({ type: 
    String, 
    required: [true, 'Password is required'], 
    minlength: 6 
  })
  readonly password: string;

  @Prop({ 
    type: String, 
    enum: Role, 
    default: Role.USER 
  })
  readonly role: Role;

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isEmailVerified: boolean;

  @Prop({ 
    type: String, 
    required: false, 
    default: null 
  })
  readonly storedRefreshToken: string;

  @Prop({ 
    type: String, 
    required: false, 
    default: null 
  })
  readonly storedAccessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);