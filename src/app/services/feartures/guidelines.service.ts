import { Injectable } from '@angular/core';
import { Base } from './bases-service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuidelinesService extends Base<any, 'Guidelines'> {
  constructor(public override http: HttpClient) {
    super(http, 'Guidelines');
  }
}
