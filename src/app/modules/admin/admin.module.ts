import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from '../../core/core-components/core-components.module';
import { InviteUserComponent } from '../human-resource/invite-user/invite-user.component';
import { ManageUsersComponent } from './user-management/manage-users/manage-users.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [InviteUserComponent, ManageUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreComponentsModule,
    NgxDatatableModule,
  ],
})
export class AdminModule {}
