import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';
import { ServiceLocator } from './service-locator.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }
    //HttpEvent<any>
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {


        const authToken: string = this.authService.getToken();

        const authReq = req.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });

        // send cloned request with header to the next handler.
        return next.handle(authReq)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let router = ServiceLocator.injector.get(Router);
                    console.log("Interceptor error ... " + JSON.stringify(error));
                    if (error.status === 401) {
                        console.log("Interceptor code 401 ... ");
                        //logout users, redirect to login page
                        this.authService.logout();
                        //redirect to the signin page or show login modal here
                        router.navigate(['account/login']);
                        return throwError(error);
                    }

                    return throwError(error);

                })
            );
    }
}
// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class httpInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
//         // add authorization header to request

//         //Get Token data from local storage
//         let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo'));

//         if (tokenInfo && tokenInfo.token) {
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${tokenInfo.token}`,
//                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//                 }
//             });
//         }

//         return newRequest.handle(request);
//     }
// }