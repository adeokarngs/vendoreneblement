import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionHelperService } from '../../../core/helpers/session-helper.service';
import { MasterService } from '../../../services/api';
import { RoleEnums } from '../../../core/constants/enums/RoleEnums';

@Component({
  selector: 'app-user-profile',
  standalone: false,

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  role: any;
  roleEnum:RoleEnums
  constructor(private _session: SessionHelperService) {}
  ngOnInit() {
    this.role = this._session.getCurrentUser()?.user?.role?.code;
    
  }

  isVisible(e:string){
    debugger
    if(e == this.role){
      return true;
    }
    else if (e == this.role){
      return true;
    }
    else{
      return false;
    }
  }
}
