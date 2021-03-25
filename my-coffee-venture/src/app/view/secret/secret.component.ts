import { Component, OnInit } from '@angular/core';
import * as main from "./secret.config";
@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  public pics = main.PICTURES;
  constructor() { }

  ngOnInit(): void {
  }

}
