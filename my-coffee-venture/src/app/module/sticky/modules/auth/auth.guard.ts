import { NotificationService } from './../../common/notification/notification.service';
import { CustomConfirmation } from './../../common/confirmation/custom-confirmation';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private noti: NotificationService) { }
  // canActivate(route: ActivatedRouteSnapshot): boolean {

  //   // this will be passed from the route config
  //   // on the data property
  //   const expectedRole = route.data.expectedRole;

  //   const token = localStorage.getItem('token');

  //   // decode the token to get its payload
  //   const tokenPayload = decode(token);

  //   if (
  //     !this.auth.isAuthenticated() ||
  //     tokenPayload.role !== expectedRole
  //   ) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const expectedRole = route.data.expectedRole;
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const token = jwtHelper.decodeToken(loggedUser ? loggedUser.accessToken : "");
    const roles = (token && token.roles) ? token.roles : "";
    if (this.authService.isAuthenticated() && (!expectedRole || (roles.indexOf(expectedRole) != -1))) {
      return true;
    }
    else if (!this.authService.isAuthenticated()) {
      const confirmation = new CustomConfirmation("This function requires you to log in. Do you want to proceed?");
      confirmation.accept = () => {

        // otherwise redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
      this.noti.confirm(confirmation);
      return false;
    }
    else {
      this.noti.showWarning("You do not have access to this page, please contact developer for access!");
      return false;
    }
    //   // decode the token to get its payload
    //   const tokenPayload = decode(token);

    //   if (
    //     !this.auth.isAuthenticated() ||
    //     tokenPayload.role !== expectedRole
    //   ) {
    //     this.router.navigate(['login']);
    //     return false;
    //   }
    //   return true;
    // const confirmation = new CustomConfirmation("You will be redirected to login page. Do you want to proceed?");
    // confirmation.accept = () => {

    //   // otherwise redirect to login page with the return url
    //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // }
    // this.noti.confirm(confirmation);
    // return false;
  }

  /**
  * Get cookies by name
  */
  public getCookie(name: string): string {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (const item of ca) {
      let c = item;
      while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
      if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
    }
    return '';
  }

  /**
   * Set cookies by name
   */
  public setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
}
