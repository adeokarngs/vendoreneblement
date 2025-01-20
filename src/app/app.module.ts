import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { PublicModule } from './modules/public/public.module';
import { tokenInterceptor } from './core/interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, AuthModule,
    AppRoutingModule, LayoutModule, NgbModule, PublicModule
  ],
  providers: [provideHttpClient(
    withInterceptors([tokenInterceptor]),
  ), ],
  bootstrap: [AppComponent]
})
export class AppModule { }
