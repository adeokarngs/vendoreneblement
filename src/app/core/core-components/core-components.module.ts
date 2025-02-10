import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponentsRoutingModule } from './core-components-routing.module';
import { FileControlComponent } from './file-control/file-control.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerGridComponent } from './server-grid/server-grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MultiselectDropdownComponent } from './multiselect-dropdown/multiselect-dropdown.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [FileControlComponent, CaptchaComponent, ServerGridComponent, MultiselectDropdownComponent],
  imports: [
    CommonModule,
    CoreComponentsRoutingModule,
    FormsModule,
    NgxDatatableModule,NgMultiSelectDropDownModule,FormsModule,ReactiveFormsModule
  ],
  exports: [FileControlComponent, CaptchaComponent, ServerGridComponent,MultiselectDropdownComponent],
})
export class CoreComponentsModule {}
