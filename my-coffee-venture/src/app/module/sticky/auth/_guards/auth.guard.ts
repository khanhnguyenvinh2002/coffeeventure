// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { isLoggedIn } from '../_selectors/auth.selectors';
import { HttpClient } from '@angular/common/http';
import { Logout, Login } from '../_actions/auth.actions';
import { AuthService } from '../_services/auth.service';
import { AppState } from '../../reducers';

@Injectable()
export class AuthGuard implements CanActivate {
    public authConfig: any;
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private auth: AuthService) {
        this.authConfig = {
            accessToken: 'AccessToken',
            userInfo: 'UserInfo'
        };
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const accessToken = this.getCookie(this.authConfig.accessToken);
        const user = this.getCookie(this.authConfig.userInfo);
        if (accessToken && accessToken !== null && user && user !== null) {
            var userInfo = JSON.parse(this.getCookie(this.authConfig.userInfo))
            this.store.dispatch(new Login({ user: userInfo }));
            return true;
        } else {
            this.router.navigateByUrl('auth/login-child');
            return false;
        }

        // if(this.getCookie(this.authConfig.accessToken) !== null)
        // {
        //     this.router.navigateByUrl('/apps/dashboard');
        //     return true;
        // } 
        // this.router.navigateByUrl('/apps/login');
        // return false;
        // return this.auth.authenticate({ moduleUrl: state.url }).pipe(map(result => {
        //     if (result.isAuthenticated) {
        //         this.store.dispatch(new Login({ user: result.user }));
        //         if (state.url !== '/apps/dashboard') {
        //             if (result.canAccess) {
        //                 return true;
        //             } else {
        //                 this.router.navigate(['error/403']);
        //             }
        //         } else {
        //             return true;
        //         }
        //     } else {
        //         this.store.dispatch(new Logout());
        //     }
        // }));
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

