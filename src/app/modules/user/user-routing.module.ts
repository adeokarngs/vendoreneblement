import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path:"user-profile",component:UserProfileComponent,
    canActivate: [authGuard],
    data:{
      mandatoryProfileComplete:true
    }
  },
  {
    path:"user-dashboard",component:UserDasboardComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
