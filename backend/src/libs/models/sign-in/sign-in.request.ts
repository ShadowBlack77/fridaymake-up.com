import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInRequest {

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}