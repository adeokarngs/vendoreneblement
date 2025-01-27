import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserDasboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
