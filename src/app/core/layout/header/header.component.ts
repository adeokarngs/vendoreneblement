import { Component } from '@angular/core';
import { SessionHelperService } from '../../helpers/session-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  /**
   *
   */
  constructor(public _session: SessionHelperService,private _router:Router) {}
  logout() {
    this._session.clearSession();
    this._router.navigate(['/auth/login']);
  }
}
