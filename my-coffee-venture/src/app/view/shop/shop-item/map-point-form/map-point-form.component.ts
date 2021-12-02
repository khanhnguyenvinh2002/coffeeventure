import { Component, Input, OnInit } from '@angular/core';
import { MapPoint } from './map-point.model';

@Component({
  selector: 'app-map-point-form',
  templateUrl: './map-point-form.component.html',
  styleUrls: ['./map-point-form.component.css']
})
export class MapPointFormComponent {
  @Input()
  mapPoint: MapPoint;

  constructor() { }


}
