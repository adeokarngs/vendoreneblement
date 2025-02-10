import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorModule } from '../vendor/vendor.module';
import { ConsultantModule } from '../consultant/consultant.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserDasboardComponent,

  ],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, FormsModule,VendorModule,ConsultantModule],
})
export class UserModule {}
