import { NotificationService } from './../../common/notification/notification.service';
import { CustomConfirmation } from './../../common/confirmation/custom-confirmation';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private noti: NotificationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      // logged in so return true
      return true;
    }
    const confirmation = new CustomConfirmation("You will be redirected to login page. Do you want to proceed?");
    confirmation.accept = () => {

      // otherwise redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    this.noti.confirm(confirmation);
    return false;
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
