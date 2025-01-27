import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponentsRoutingModule } from './core-components-routing.module';
import { FileControlComponent } from './file-control/file-control.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FileControlComponent,
    CaptchaComponent
  ],
  imports: [
    CommonModule,
    CoreComponentsRoutingModule,FormsModule
  ],
  exports:[FileControlComponent,CaptchaComponent]
})
export class CoreComponentsModule { }
