import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PublicLayoutComponent,
    AuthenticatedLayoutComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PublicLayoutComponent,
    AuthenticatedLayoutComponent,
  ],
})
export class LayoutModule {}
