import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserDasboardComponent,
    VendorDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class UserModule { }
