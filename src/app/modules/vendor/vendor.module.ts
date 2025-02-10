import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { AddResourceComponent } from './resource-management/add-resource/add-resource.component';
import { ListResourceComponent } from './resource-management/list-resource/list-resource.component';
import { ViewResourceComponent } from './resource-management/view-resource/view-resource.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CoreComponentsModule } from '../../core/core-components/core-components.module';


@NgModule({
  declarations: [
    VendorDetailsComponent,
    AddResourceComponent,
    ListResourceComponent,
    ViewResourceComponent,
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    CoreComponentsModule,
  ],
  exports: [VendorDetailsComponent],
 
})
export class VendorModule {}
