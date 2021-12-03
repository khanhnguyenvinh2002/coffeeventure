import { AuthService } from '../auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../base/common/http/http.service';

@Injectable({
    providedIn: 'root'
})

export class ImageService extends HttpService {
    constructor(private authService: AuthService) {
        super();
        this.url = this.origin + 'image';
    }
    public upload(formData: FormData, isSpinner?: boolean): Observable<any> {
        return this.httpClient.post<any>(this.url, formData,
            { observe: 'response', reportProgress: true, headers: new HttpHeaders({ 'AccessToken': this.authService.getToken() }) });
    }
}