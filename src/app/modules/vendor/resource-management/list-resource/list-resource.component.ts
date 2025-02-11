import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SessionHelperService } from '../../../../core/helpers/session-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-resource',
  standalone: false,

  templateUrl: './list-resource.component.html',
  styleUrl: './list-resource.component.css',
})
export class ListResourceComponent {
  url = `${environment.BASE_URL_AI}/api/Resource/get-resource-grid`;
  columns = [{ name: 'Name', prop: 'name' }];
  uData: any;
  /**
   *
   */
  constructor(
    private _session: SessionHelperService,
    private _router: Router,
  ) {}
  ngOnInit() {
    this.uData = {
      'uData.VendorDetailsId': this._session.getCurrentUser()?.user?.vendor?.id,
    };
    this.columns = [
      { name: 'Name', prop: 'name' },
      { name: 'Email', prop: 'email' },
      { name: 'Phone', prop: 'phoneNumber' },
      { name: 'Title', prop: 'jobTitle' },
    ];
  }

  view(e) {
    this._router.navigate(['vendor/view-resource/' + e.id]);
  }
  edit(e) {
    this._router.navigate(['vendor/edit-resource/' + e.id]);
  }
}
