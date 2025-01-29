import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteUserComponent } from './user-management/invite-user/invite-user.component';
import { ManageUsersComponent } from './user-management/manage-users/manage-users.component';

const routes: Routes = [
  {
    path:"invite-user",component:InviteUserComponent
  },
  {
    path:"manage-users",component:ManageUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
