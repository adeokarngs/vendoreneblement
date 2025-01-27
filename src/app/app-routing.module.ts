import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from './core/layout/authenticated-layout/authenticated-layout.component';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {
    path:"",
    redirectTo:"auth/login",
    pathMatch:"full"
  },
  {
    path: "public",
    component: PublicLayoutComponent,
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),

  },
  {
    path: "admin",
    component: AuthenticatedLayoutComponent,
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: "auth",
    component: PublicLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "user",
    component: AuthenticatedLayoutComponent,
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
