import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseFormComponent } from 'src/app/module/sticky/component';
import { NominatimService } from 'src/app/module/sticky/modules/maps/\bnominatim.service';
import { NominatimResponse } from 'src/app/module/sticky/modules/maps/nominatim-response.model';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent extends BaseFormComponent{
  @ViewChild('form', { static: true }) form: NgForm;
  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  lat:number;
  lon:number;
  searchResults: NominatimResponse[];
  searchResult: NominatimResponse;

  constructor(private nominatimService: NominatimService) {

    super();
  }

  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }
  addressLookupCoordinates() {
    if (this.form) {
      if (!this.validateForm(this.form, 'map')) {
        return;
      }
      if (this.form.form.dirty) {
        this.nominatimService.addressLookupCoordinates(this.lat,this.lon).subscribe(results => {
          this.searchResult = results;
          console.log(results);
        });
      } else {
        this.searchResult =  undefined;
      }
      this.onSearch.emit(this.searchResults);
      
    }
     
  }

}
