import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TranslationComponent } from './translation/translation.component';
import { VideoTranslationComponent } from './video-translation/video-translation.component';

const routes: Routes = [
  {
    path:"",component:HomeComponent
  },
  {
    path:"translation",component:TranslationComponent
  },
  {
    path:"video-translation",component:VideoTranslationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
