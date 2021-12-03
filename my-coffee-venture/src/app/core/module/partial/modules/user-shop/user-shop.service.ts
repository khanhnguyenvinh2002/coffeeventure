import { RequestPayload } from '../../../../base/common/http/request-payload.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../../base/common/http/base-response.model';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../../base/common/http/http.service';

@Injectable({
    providedIn: 'root'
})

export class UserShopService extends HttpService {
    constructor() {
        super();
        this.url = this.origin + 'user-shop';
    }

    // public insertShop(body: BaseResponse, isSpinner?: boolean): Observable<any> {
    //     return this.intercept(this.httpClient.post<any>(`${this.url}/insert-shop`,
    //         JSON.stringify(body), { observe: 'response', headers: this.getHeaders() }), isSpinner)
    //         .pipe(map(r => r.body));
    // }
    public deleteShopFromUser(request: RequestPayload, isSpinner?: boolean): Observable<boolean> {
        return this.intercept(this.httpClient.delete(`${this.url}/delete-user-shop`,
            { observe: 'response', headers: this.getHeaders(), params: this.toParams(request) }), isSpinner)
            .pipe(map(r => r.body));
    }
}
