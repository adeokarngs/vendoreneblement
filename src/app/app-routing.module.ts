import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from './core/layout/authenticated-layout/authenticated-layout.component';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {
    path:"public",
    component:PublicLayoutComponent,
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
    
  },
  {
    path:"vendor", 
    component:AuthenticatedLayoutComponent,
    loadChildren: () => import('./modules/vendor/vendor.module').then(m => m.VendorModule),
    canActivate:[authGuard]
  },
  {
    path:"auth", 
    component:PublicLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
