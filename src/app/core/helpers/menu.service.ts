import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionHelperService } from './session-helper.service';
import { Router } from '@angular/router';
import { RoleEnums } from '../constants/enums/RoleEnums';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  menuMaster = [
    {
      path: "/user/user-dashboard", title: "Dashboard",isAccessibleTo:`${RoleEnums.Consultant,RoleEnums.Vendor}`
    },
    {
      path: "/user/user-profile", title: "My Profile", default: true,isAccessibleTo:`${RoleEnums.Consultant,RoleEnums.Vendor}`
    },
    {
      path: "/vendor/resource-management", title: "Resource Management",isAccessibleTo:`${RoleEnums.Consultant,RoleEnums.Vendor}`
    },
    {
      path: "/admin/manage-users", title: "User Management",isAccessibleTo:`${RoleEnums.Admin}`
    }

  ]
  lstMenu = new BehaviorSubject([])

  constructor(private _session: SessionHelperService, private _router: Router) { }

  getMenu() {
    if (this._session.checkIfProfileIsCompleted()) {
      const role = this._session.getCurrentUser()?.user?.role?.code
      this.lstMenu.next(this.menuMaster.filter(x=>x.isAccessibleTo.includes(role)))
    }
    else {
      this.lstMenu.next(this.menuMaster.filter(x => x.default == true))
    }

  }


}
