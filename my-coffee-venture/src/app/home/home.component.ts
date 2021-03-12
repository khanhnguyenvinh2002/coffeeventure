import { Component, OnInit } from '@angular/core';
import * as main from "./home.config";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pics = main.PICTURES;
  constructor() { }

  ngOnInit(): void {
  }

}
