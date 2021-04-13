import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/module/sticky/modules/auth/auth.guard';
import { SecretComponent } from './secret.component';

const routes: Routes = [{
  path: '', component: SecretComponent,
  canActivate: [AuthGuard], data: {
    expectedRole: 'owner'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
