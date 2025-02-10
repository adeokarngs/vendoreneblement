import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantRoutingModule } from './consultant-routing.module';
import { ConsultantDetailsComponent } from './consultant-details/consultant-details.component';


@NgModule({
  declarations: [
    ConsultantDetailsComponent
  ],
  imports: [
    CommonModule,
    ConsultantRoutingModule
  ],
  exports:[ConsultantDetailsComponent]
})
export class ConsultantModule { }
