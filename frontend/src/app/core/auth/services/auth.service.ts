import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../../env';
import { UserModel } from '../models';
import { SignInModel } from '@features';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly defaultHeaders: HttpHeaders = new HttpHeaders({
    'x-bypass-interceptor': 'true'
  });

  public signIn(signInCredentials: SignInModel): Observable<unknown> {
    return this.httpClient.post<unknown>(`${BACKEND_URL}/api/v1/auth/sign-in`, signInCredentials, { 
      withCredentials: true,
      headers: this.defaultHeaders
    });
  }

  public signUp(signUpCredentials: any): Observable<unknown> {
    return this.httpClient.post<unknown>(`${BACKEND_URL}/api/v1/auth/sign-up`, signUpCredentials, { 
      headers: this.defaultHeaders 
    });
  }

  public signOut(): Observable<void> {
    return this.httpClient.post<void>(`${BACKEND_URL}/api/v1/auth/sign-out`, { 
      content: 'logout' 
    }, {
      withCredentials: true,
      headers: this.defaultHeaders
    });
  }

  public getUser(): Observable<{ content: UserModel }> {
    return this.httpClient.get<{ content: UserModel }>(`${BACKEND_URL}/api/v1/auth/user`);
  }

  public checkTokenValidity(): Observable<unknown> {
    return this.httpClient.get<unknown>(`${BACKEND_URL}/api/v1/auth/check-validation`, {
      withCredentials: true,
      headers: this.defaultHeaders
    });
  }

  public refreshToken(): Observable<unknown> {
    return this.httpClient.post<unknown>(`${BACKEND_URL}/api/v1/auth/refresh-token`, {
      content: 'refresh token'
    }, {
      withCredentials: true,
      headers: this.defaultHeaders
    })
  }
}
