import { Component } from '@angular/core';
import { SessionHelperService } from '../../helpers/session-helper.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  /**
   *
   */
  constructor(public _session:SessionHelperService) {
   
    
  }
}
