import { Component } from '@angular/core';
import { SessionHelperService } from './core/helpers/session-helper.service';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from './core/helpers/menu.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VendorEnablementPortall';
  /**
   *
   */
  constructor(private _router:Router,private _session: SessionHelperService, private toastr: ToastrService,private _menu:MenuService) {


  }
  ngOnInit() {
    if(this._session.checkSessionPersistence()){
      this._menu.getMenu();
    }
    
  }

}
