import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  loaderSubject = new BehaviorSubject<boolean>(false); // Default: loader is visible
  loaderState$ = this.loaderSubject.asObservable();
  private activeRequests = 0;
  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }

  startRequest() {
    this.activeRequests++;
    this.show();
  }

  endRequest() {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.hide();
    }
  }
}
