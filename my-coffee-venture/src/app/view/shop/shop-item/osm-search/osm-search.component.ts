import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseFormComponent } from 'src/app/core/base/component';
import { NominatimService } from 'src/app/core/module/partial/modules/maps/nominatim.service';
import { NominatimResponse } from 'src/app/core/module/partial/modules/maps/nominatim-response.model';

@Component({
  selector: 'app-osm-search',
  templateUrl: './osm-search.component.html',
  styleUrls: ['./osm-search.component.css']
})
export class OsmSearchComponent extends BaseFormComponent{
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
