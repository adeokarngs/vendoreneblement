import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ResourceService } from '../../../../services/api';

@Component({
  selector: 'app-view-resource',
  standalone: false,

  templateUrl: './view-resource.component.html',
  styleUrl: './view-resource.component.css',
})
export class ViewResourceComponent {
  resourceId: string;
  objResource: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _resource: ResourceService,
  ) {}
  ngOnInit() {
    this.resourceId = this._activatedRoute.snapshot.paramMap.get('id');
    this.loadResourceDetails(this.resourceId)
  }
  loadResourceDetails(id) {
    this._resource.resourceById(id).subscribe((rep) => {
       this.objResource = rep.data;
    });
  }
}
