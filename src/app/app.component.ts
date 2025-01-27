import { Component } from '@angular/core';
import { SessionHelperService } from './core/helpers/session-helper.service';
import { ToastrService } from 'ngx-toastr';


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
  constructor(private _session: SessionHelperService, private toastr: ToastrService) {


  }
  ngOnInit() {
    // this._session.checkSessionPersistence()
  }

}
