import { Component } from '@angular/core';
import { SessionHelperService } from '../../helpers/session-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  /**
   *
   */
  constructor(private _session:SessionHelperService,private _router:Router) {
    
  }
  logout(){
    this._session.clearSession();
    this._router.navigate(["/auth/login"])
  }
}
