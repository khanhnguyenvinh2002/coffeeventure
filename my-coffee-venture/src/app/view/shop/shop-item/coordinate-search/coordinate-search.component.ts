import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/core/base/common/notification/notification.service';
import { BaseFormComponent } from 'src/app/core/base/component';
import { NominatimService } from 'src/app/core/module/partial/modules/maps/nominatim.service';
import { NominatimResponse } from 'src/app/core/module/partial/modules/maps/nominatim-response.model';

@Component({
  selector: 'app-coordinate-search',
  templateUrl: './coordinate-search.component.html',
  styleUrls: ['./coordinate-search.component.css']
})
export class CoordinateSearchComponent extends BaseFormComponent {
  @ViewChild('form', { static: true }) form: NgForm;
  @Output() onSearch = new EventEmitter();
  @Output() addPoint = new EventEmitter<NominatimResponse>();
  @Output() locationSelect = new EventEmitter();
  lat: number;
  lon: number;
  searchResults: NominatimResponse[];
  searchResult: NominatimResponse;
  personsForm: FormGroup;

  constructor(private nominatimService: NominatimService, private fb: FormBuilder, private noti: NotificationService) {

    super();
  }

  ngOnInit() {
    setTimeout(() => {
      this.form.form.markAsPristine()
    }, 0);
    this.personsForm = this.fb.group({
      persons: this.fb.array([])
    });
  }

  onFormSubmit() {
    alert(JSON.stringify(this.personsForm.value));
  }

  addPerson() {
    if (this.form) {
      if (!this.validateForm(this.form, 'map')) {
        this.noti.showError("the form is invalid");
        return;
      }
      if (this.personsForm.value.persons && this.personsForm.value.persons.length > 0) {
        this.addPoint.emit(new NominatimResponse(this.personsForm.value.persons[this.personsForm.value.persons.length - 1].lat, this.personsForm.value.persons[this.personsForm.value.persons.length - 1].lon, "name"));
      }// this.personsForm.value[this.personsForm.value.length-1]);
      (<FormArray>this.personsForm.get('persons')).push(this.fb.group({
        lat: [],
        lon: []
      }));
    }

  }

  get persons() {
    return (<FormArray>this.personsForm.get('persons')).controls;
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
        this.nominatimService.addressLookupCoordinates(this.lat, this.lon).subscribe(results => {
          this.searchResult = results;
          console.log(results);
        });
      } else {
        this.searchResult = undefined;
      }
      this.onSearch.emit(this.searchResults);

    }

  }

}
