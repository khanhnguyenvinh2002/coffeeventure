import { Router } from '@angular/router';
import { HttpService } from './../../common/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';

const jwtHelper = new JwtHelperService();

export class Role {
  id: number;
  title: string;
  name?: string;
  permissions: number[];
  isCoreRole = false;

  clear(): void {
    this.id = undefined;
    this.title = '';
    this.permissions = [];
    this.isCoreRole = false;
  }
}
export class Account {
  isAuthenticated: boolean;
  canAccess: boolean;
  user: AccountInfo;
  redirect: string;
}
export class AccountInfo {
  firstName: string;
  userName: string;
  fullName: string;
  avatar: string;
  language: string;
  roles?: Role[];

}
export class AccountChild {
  userInfo: AccountInfo;
  accessToken: string;
  canAccess: boolean;
}
@Injectable()
export class AuthService extends HttpService {

  private loginUrl: string;
  private logoutUrl: string;
  constructor(private route: Router) {
    super();

    this.url = this.origin + 'account';
    this.loginUrl = this.url + "/login";
    this.logoutUrl = this.url + "/logout";
  }
  login(username: string, password: string): Observable<AccountChild> {

    return this.httpClient.post<AccountChild>(this.loginUrl, { username: username, password: password }, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(r => r.body));
  }
  register(username: string, password: string): Observable<AccountChild> {

    return this.httpClient.post<AccountChild>(this.url + "/register", { username: username, password: password }, { headers: this.getHeaders(), observe: 'response' })
      .pipe(
        map(r => r.body));
  }

  //         if (token) {
  //           // store username and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('loggedUser', JSON.stringify({ username: username, token: token, refreshToken: refreshToken }));

  //           // return true to indicate successful login
  //           return true;
  //         } else {
  //           // return false to indicate failed login
  //           return false;
  //         }
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
  // login(username: string, password: string): Observable<boolean> {

  //   return this.httpClient.post(this.loginUrl, { username: username, password: password }, { headers: this.getHeaders(), observe: 'response' })
  //     .pipe(
  //       map((response: HttpResponse<any>) => {
  //         // login successful if there's a jwt token in the response
  //         let token = response.body.token;
  //         let refreshToken = response.body.refreshToken;

  //         if (token) {
  //           // store username and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('loggedUser', JSON.stringify({ username: username, token: token, refreshToken: refreshToken }));

  //           // return true to indicate successful login
  //           return true;
  //         } else {
  //           // return false to indicate failed login
  //           return false;
  //         }
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  logout(): void {
    localStorage.removeItem('loggedUser');
    localStorage.clear();
    // clear token remove user from local storage to log user out
    // this.setCookie("AccessToken", "", 0);
    this.httpClient.post<string>(this.logoutUrl, "", { headers: this.getHeaders(), observe: 'response' }).subscribe(res => {

      this.route.navigate(['app/home']);
    });
  }

  getToken(): string {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let token = loggedUser && loggedUser.accessToken;
    return token ? token : "";
  }

  getUser(): string {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.isAuthenticated()) {
      return loggedUser.userName;
    }
    else {
      this.logout();
      return '';
    }

  }
  getUserId() {
    if (this.isAuthenticated()) {
      let loggedUser = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('loggedUser'))?.accessToken);
      return loggedUser.jti;
    }
    else {
      this.logout();
      return '';
    }

  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired or not
    // return true or false
    return token != "" ? !jwtHelper.isTokenExpired(token) : false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(error);
  }
}