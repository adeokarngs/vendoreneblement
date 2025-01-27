import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _router:Router,private _activateRoute:ActivatedRoute) { }

  IsEditPage(){
    return this._router.url.includes('edit')
  }
  
}
