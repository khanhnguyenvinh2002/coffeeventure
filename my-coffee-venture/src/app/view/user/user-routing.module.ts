import { ShopSavedComponent } from './shop-saved/shop-saved.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from 'src/app/module/sticky/modules/auth/auth.guard';

const routes: Routes = [{
  path: '', component: UserComponent,
  canActivate: [AuthGuard]
}, {
  path: 'saved-shops', component: ShopSavedComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
