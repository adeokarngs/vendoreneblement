import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteUserComponent } from './user-management/invite-user/invite-user.component';

const routes: Routes = [
  {
    path:"invite-user",component:InviteUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
