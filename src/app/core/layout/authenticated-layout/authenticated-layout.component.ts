import { Component } from '@angular/core';
import { LoaderService } from '../../helpers/loader.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-authenticated-layout',
  standalone: false,

  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.css',

  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, visibility: 'hidden' })),
      state('*', style({ opacity: 1, visibility: 'visible' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ])
  ]
})
export class AuthenticatedLayoutComponent {
  /**
   *
   */
  // Observable for *ngIf
  
  constructor(public loaderService: LoaderService) {
   
  }

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
