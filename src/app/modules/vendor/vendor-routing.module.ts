import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListResourceComponent } from './resource-management/list-resource/list-resource.component';
import { AddResourceComponent } from './resource-management/add-resource/add-resource.component';
import { ViewResourceComponent } from './resource-management/view-resource/view-resource.component';

const routes: Routes = [
  {
    path:"resource-management",component:ListResourceComponent
  },
  {
    path:"add-resource",component:AddResourceComponent
  },
  {
    path:"view-resource/:id",component:ViewResourceComponent
  },
  {
    path:"edit-resource/:id",component:AddResourceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
