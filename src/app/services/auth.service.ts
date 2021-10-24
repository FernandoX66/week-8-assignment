import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { Login } from '../interfaces/login.interface';
import { UserRegistration } from '../interfaces/user-registration.interface';
import { UserLogin } from '../interfaces/user-login.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(userInformation: UserRegistration): Observable<User> {
    return this.http.post<User>(
      'https://sheltered-oasis-97086.herokuapp.com/auth/signup',
      userInformation
    );
  }

  logIn(userLoginInformation: UserLogin): Observable<boolean> {
    return this.http
      .post<Login>(
        'https://sheltered-oasis-97086.herokuapp.com/auth/login',
        userLoginInformation
      )
      .pipe(
        map((response: Login) => {
          if (response && response.accessToken) {
            localStorage.setItem('token', JSON.stringify(response.accessToken));
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getProfile(): Observable<User> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const requestHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${token}`
    );

    return this.http.get<User>(
      'https://sheltered-oasis-97086.herokuapp.com/auth/profile',
      { headers: requestHeaders }
    );
  }
}
