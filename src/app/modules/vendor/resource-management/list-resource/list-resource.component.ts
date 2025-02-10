import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SessionHelperService } from '../../../../core/helpers/session-helper.service';

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
  constructor(private _session:SessionHelperService) {
   
    
  }
  ngOnInit() {
    this.uData = {
      "uData.VendorDetailsId": this._session.getCurrentUser()?.user?.vendor?.id
    }
    this.columns = [
      { name: 'Name', prop: 'name' },
      { name: 'Email', prop: 'email' },
      { name: 'Phone', prop: 'phoneNumber' },
      { name: 'Title', prop: 'jobTitle' },
    ];

    
  }
}
