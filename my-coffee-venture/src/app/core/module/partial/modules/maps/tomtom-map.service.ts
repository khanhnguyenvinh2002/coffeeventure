import { Injectable } from "@angular/core";
import { HttpService } from "../../../../base/common/http/http.service";
import tt from '@tomtom-international/web-sdk-services';


@Injectable({
    providedIn: 'root'
})

export class TomtomMapService extends HttpService {
    key = "PNAk0ku7BFNMCaRADAGi0c45eDwbYPJv";
    constructor() {
        super();
        this.url = this.origin + 'user';
    }
    searchWithQuery(){
        tt.services.fuzzySearch({
            key: this.key,
            query: 'Golden Gate Bridge'
          })
    }
    geoCoding(query:string){
        var geocodeOptions = { 
            query: query ,
            key: this.key
        }; 
        // Look up the geocode of the given address 
        tt.services.geocode(geocodeOptions).then(function (geocodeRes) { 
            console.log(geocodeRes); 
            var reverseOptions = { 
                position: geocodeRes.results[0].position, 
                key: 'Vn26cA8knt2E8sl0WBEWvAgWGRUf59mm' 
            } 

// with our geocode, do a reverse look-up to get our original address back 
            tt.services.reverseGeocode(reverseOptions).then(function (reverseRes) { 
                console.log(reverseRes); 
            }); 
        }); 
    }
}