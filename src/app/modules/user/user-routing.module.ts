import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';

const routes: Routes = [
  {
    path:"user-profile",component:UserProfileComponent
  },
  {
    path:"user-dashboard",component:UserDasboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
