
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptService implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                    }
                },
                error => {
                    console.error(error.status);
                    console.error(error.message);
                }
            )
        );
    }
}
