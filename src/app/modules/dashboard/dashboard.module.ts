import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HumanResourceModule } from '../human-resource/human-resource.module';

@NgModule({
  declarations: [HomeDashboardComponent],
  imports: [CommonModule, DashboardRoutingModule,HumanResourceModule],
})
export class DashboardModule {}
