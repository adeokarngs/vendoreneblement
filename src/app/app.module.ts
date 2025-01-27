import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { PublicModule } from './modules/public/public.module';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { AdminModule } from './modules/admin/admin.module';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { environment } from '../environments/environment.development';
import { APIS, BASE_PATH } from './services/api';
import { UserModule } from './modules/user/user.module';


@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, AuthModule,
    AppRoutingModule, LayoutModule, NgbModule, PublicModule, AdminModule, BrowserAnimationsModule,UserModule,
    ToastrModule.forRoot()
  ],

  providers: [...APIS, { provide: BASE_PATH, useValue: environment.BASE_URL_AI }, provideHttpClient(
    withInterceptors([tokenInterceptor, errorHandlerInterceptor]),
  ), provideToastr(), provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
