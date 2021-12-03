import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/module/partial/modules/auth/auth.guard';
import { ReviewerComponent } from './reviewer.component';

const routes: Routes = [{
  path: '', component: ReviewerComponent,
  canActivate: [AuthGuard], data: {
    expectedRole: 'ADMIN'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
