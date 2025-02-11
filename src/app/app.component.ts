import { Component } from '@angular/core';
import { SessionHelperService } from './core/helpers/session-helper.service';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from './core/helpers/menu.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LoaderService } from './core/helpers/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'VendorEnablementPortall';
  constructor(
    private _session: SessionHelperService,

    private _menu: MenuService,
  ) {
    // this._router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     this._loader.show();
    //   } else if (
    //     event instanceof NavigationEnd ||
    //     event instanceof NavigationCancel ||
    //     event instanceof NavigationError
    //   ) {
    //     this._loader.hide();
    //   }
    // });
  }

  ngOnInit() {
    if (this._session.checkSessionPersistence()) {
      this._menu.getMenu();
    }
  }
}
