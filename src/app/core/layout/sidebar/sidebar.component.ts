import { Component } from '@angular/core';
import { SessionHelperService } from '../../helpers/session-helper.service';
import { Router } from '@angular/router';
import { MenuService } from '../../helpers/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  lstMenu: (
    | { path: string; tile: string; default?: undefined }
    | { path: string; tile: string; default: boolean }
  )[];
  objUser:any;

  /**
   *
   */
  constructor(
    private _session: SessionHelperService,
    public _router: Router,
    public _menu: MenuService,
  ) {}

  ngOnInit() {
    this.objUser  = this._session.getCurrentUser()
  }
  logout() {
    this._session.clearSession();
    this._router.navigate(['/auth/login']);
  }
  goto(e) {
    this._router.navigate([e]);
  }
}
