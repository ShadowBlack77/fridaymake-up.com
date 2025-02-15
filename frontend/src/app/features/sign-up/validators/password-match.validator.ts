import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('passwordConfirmation')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}