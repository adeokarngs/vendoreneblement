import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from '../../core/core-components/core-components.module';
import { InviteUserComponent } from './user-management/invite-user/invite-user.component';


@NgModule({
  declarations: [
    InviteUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,ReactiveFormsModule,FormsModule,CoreComponentsModule
  ]
})
export class AdminModule { }
