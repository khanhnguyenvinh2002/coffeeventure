import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NominatimResponse} from './nominatim-response.model';
import {map} from 'rxjs/operators';
import {BASE_NOMINATIM_URL, DEFAULT_VIEW_BOX} from './constants.model';
import { HttpService } from '../../../../base/common/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NominatimService extends HttpService {

  constructor() {
    super();
  }

  addressLookup(req?: any): Observable<NominatimResponse[]> {
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}&${DEFAULT_VIEW_BOX}&bounded=1`;
    return this.httpClient
      .get(url).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        )
      )
  }

  addressLookupCoordinates(lat?: any, lon?: any): Observable<NominatimResponse> {
    let url = `https://${BASE_NOMINATIM_URL}/reverse?format=json&lat=${lat}&lon=${lon}&${DEFAULT_VIEW_BOX}&bounded=1`;
    return this.httpClient
      .get(url).pipe(
        map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        
      )
  }

}