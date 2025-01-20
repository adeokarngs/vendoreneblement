import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { TranslationComponent } from './translation/translation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoTranslationComponent } from './video-translation/video-translation.component';


@NgModule({
  declarations: [
    HomeComponent,
    TranslationComponent,
    VideoTranslationComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class PublicModule { }
