import { Component } from '@angular/core';
import { RoleEnums } from '../../../core/constants/enums/RoleEnums';
import { SessionHelperService } from '../../../core/helpers/session-helper.service';

@Component({
  selector: 'app-home-dashboard',
  standalone: false,

  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent {
  roleEnum = RoleEnums;
  currentRole = null;
  constructor(private _session: SessionHelperService) {
    this.currentRole = this._session.getCurrentUser()?.user?.role.code;
  }
}
