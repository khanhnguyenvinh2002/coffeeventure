import { RequestPayload } from '../../common/http/request-payload.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../common/http/base-response.model';
import { map } from 'rxjs/operators';
import { HttpService } from '../../common/http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService extends HttpService {
    constructor() {
        super();
        this.url = this.origin + 'user';
    }

    public viewUserById(id: string, isSpinner?: boolean): Observable<any> {
        return this.intercept(this.httpClient.get<any>(`${this.url}/view-user/${id}`,
            { observe: 'response', headers: this.getHeaders() }), isSpinner)
            .pipe(map(r => r.body));
    }
    public uploadAvatar(formData: FormData, isSpinner?: boolean, params?: any): Observable<any> {
        return this.intercept(this.httpClient.post<any>(`${this.url}/upload-avatar`, formData, {
            observe: 'response', headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.getCookie("AccessToken"),
                'AccessToken': this.getToken(),
            }), params: this.toParams(params), reportProgress: true
        }), isSpinner)
            .pipe(map(r => r.body));
    }
    public deleteUserFromRole(request: RequestPayload, isSpinner?: boolean): Observable<boolean> {
        return this.intercept(this.httpClient.delete(`${this.url}/delete-user-role`,
            { observe: 'response', headers: this.getHeaders(), params: this.toParams(request) }), isSpinner)
            .pipe(map(r => r.body));
    }
}
