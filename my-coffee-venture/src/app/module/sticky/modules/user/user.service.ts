import { RequestPayload } from '../../common/http/request-payload.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../common/http/base-response.model';
import { map } from 'rxjs/operators';
import { HttpService } from '../../common/http/http.service';

@Injectable({
    providedIn: 'root'
})

export class UserService extends HttpService {
    constructor() {
        super();
        this.url = this.origin + 'user';
    }

    public deleteUserFromRole(request: RequestPayload, isSpinner?: boolean): Observable<boolean> {
        return this.intercept(this.httpClient.delete(`${this.url}/delete-user-role`,
            { observe: 'response', headers: this.getHeaders(), params: this.toParams(request) }), isSpinner)
            .pipe(map(r => r.body));
    }
}
