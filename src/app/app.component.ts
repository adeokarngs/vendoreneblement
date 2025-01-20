import { Component } from '@angular/core';
import { SessionHelperService } from './core/helpers/session-helper.service';

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
  constructor(private _session:SessionHelperService) {
    
    
  }
  ngOnInit(){
    this._session.checkSessionPersistence()
  }

}
