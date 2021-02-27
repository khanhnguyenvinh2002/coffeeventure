import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewerComponent } from './reviewer.component';

const routes: Routes = [{
  path: '', component: ReviewerComponent, redirectTo: '',
  pathMatch: 'full',
  // children: [
  //   {
  //     path: '',
  //     pathMatch: 'full'
  //   }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
