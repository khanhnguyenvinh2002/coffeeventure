import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './secret-routing.module';
import { SecretComponent } from './secret.component';


@NgModule({
  declarations: [SecretComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
