import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
} from '@angular/core';
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
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { environment } from '../environments/environment.development';
import { APIS, BASE_PATH } from './services/api';
import { UserModule } from './modules/user/user.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreComponentsModule } from './core/core-components/core-components.module';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { VendorModule } from './modules/vendor/vendor.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { HumanResourceModule } from './modules/human-resource/human-resource.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    NgxDatatableModule,
    CoreComponentsModule,
    AppRoutingModule,
    LayoutModule,
    NgbModule,
    PublicModule,
    AdminModule,
    BrowserAnimationsModule,
    UserModule,
    VendorModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      newestOnTop: true,
      tapToDismiss: false,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),
    CommonModule,
    NgbModule,
    HumanResourceModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ...APIS,
    { provide: BASE_PATH, useValue: environment.BASE_URL_AI },
    provideHttpClient(
      withInterceptors([loadingInterceptor,tokenInterceptor, errorHandlerInterceptor]),
    ),
    provideToastr(),
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
