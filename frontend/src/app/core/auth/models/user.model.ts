export interface UserModel {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly role: string;
  readonly isEmailVerified: string;
}