import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.baseUrl}/auth/username`,
      {
        username: username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      `${this.baseUrl}/auth/signup`,
      credentials
    );
  }
}
