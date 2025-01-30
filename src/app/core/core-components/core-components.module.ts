import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponentsRoutingModule } from './core-components-routing.module';
import { FileControlComponent } from './file-control/file-control.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { FormsModule } from '@angular/forms';
import { ServerGridComponent } from './server-grid/server-grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [FileControlComponent, CaptchaComponent, ServerGridComponent],
  imports: [
    CommonModule,
    CoreComponentsRoutingModule,
    FormsModule,
    NgxDatatableModule,
  ],
  exports: [FileControlComponent, CaptchaComponent, ServerGridComponent],
})
export class CoreComponentsModule {}
