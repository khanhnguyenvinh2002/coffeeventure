import { ForumComponent } from './forum/forum.component';
import { ShopSavedComponent } from './shop-saved/shop-saved.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from 'src/app/module/sticky/modules/auth/auth.guard';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [{
  path: '', component: UserComponent,
  canActivate: [AuthGuard]
}, {
  path: 'saved-shops', component: ShopSavedComponent,
  canActivate: [AuthGuard]
}, {
  path: 'forum', component: ForumComponent,
},
{ path: 'user-view/:id', component: UserViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
