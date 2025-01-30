import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private config = new BehaviorSubject({
    header: true,
    footer: true,
    sidebar: false,
  });
  $config = this.config.asObservable();
  constructor() {}

  setConfig(config: any) {
    this.config.next(config);
  }
}
