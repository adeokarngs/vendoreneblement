import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourceRoutingModule } from './human-resource-routing.module';
import { SearchResourceComponent } from './search-resource/search-resource.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SearchResourceComponent, HrDashboardComponent],
  imports: [
    CommonModule,
    NgbModule,
    HumanResourceRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [HrDashboardComponent],
})
export class HumanResourceModule {}
