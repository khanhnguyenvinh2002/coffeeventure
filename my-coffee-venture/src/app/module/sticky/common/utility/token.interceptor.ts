import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private inj: Injector) { }
    //HttpEvent<any>
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        let authService: AuthService = this.inj.get(AuthService); //authservice is an angular service

        console.log("intercepted request ... ");

        const authToken: string = authService.getToken();

        // cloned headers, updated with the authorization header.
        const authReq = req.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });

        // send cloned request with header to the next handler.
        return next.handle(authReq)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let router = this.inj.get(Router);
                    console.log("Interceptor error ... " + JSON.stringify(error));
                    if (error.status === 401) {
                        console.log("Interceptor code 401 ... ");
                        //logout users, redirect to login page
                        authService.logout();
                        //redirect to the signin page or show login modal here
                        router.navigate(['account/login']);
                        return throwError(error);
                    }

                    return throwError(error);

                })
            );
    }
}