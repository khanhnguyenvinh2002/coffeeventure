import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../common/http/basic-http.service';

@Injectable({
    providedIn: 'root'
})

export class ImageService extends HttpService {
    constructor() {
        super();
        this.url = this.origin + 'image';
    }
    public upload(formData: FormData, isSpinner?: boolean): Observable<any> {
        return this.httpClient.post<any>(this.url, formData,
            { observe: 'response', reportProgress: true });
    }
}