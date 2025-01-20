import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionHelperService {

  public $isLoggedIn = new BehaviorSubject(false)
  isLoggedIn = this.$isLoggedIn.asObservable();
  constructor(private _router:Router) { }


  getCurrentUser() {
    const user = localStorage.getItem("currentUser")
    if (user)
      return JSON.parse(user)
    else
      return null
  }

  clearSession() {
    this.$isLoggedIn.next(false)
    localStorage.clear();
    sessionStorage.clear();
  }

  setSession(payload: any) {
    this.$isLoggedIn.next(true)
    localStorage.setItem('currentUser', JSON.stringify(payload));
  }

  checkSessionPersistence(){
    if(this.getCurrentUser()){
      this.$isLoggedIn.next(true)
      this._router.navigate(['/vendor/test'])
    }
  }
}
