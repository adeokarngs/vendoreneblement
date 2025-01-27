import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RoleEnums } from '../constants/enums/RoleEnums';

@Injectable({
  providedIn: 'root'
})
export class SessionHelperService {

  public $isLoggedIn = new BehaviorSubject(false)
  isLoggedIn = this.$isLoggedIn.asObservable();
  constructor(private _router: Router) { }


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

  setSession(payload: any): boolean {
    this.$isLoggedIn.next(true);
    localStorage.setItem('currentUser', JSON.stringify(payload));
    if (this.performPostChecks(payload)) {
    
      return true; // Return true only if all checks pass
    }
  
    return false; // Return false if any check fails
  }
  
  checkSessionPersistence(): void {
    if (this.getCurrentUser()) {
      this.$isLoggedIn.next(true);
      this._router.navigate(['/user/user-dashboard']);
    }
  }
  
  performPostChecks(payload: any): boolean {
    const roleCode = payload?.user?.role?.code;
  
    const isProfileComplete = roleCode == RoleEnums.Consultant || roleCode== RoleEnums.Vendor?this.checkIfProfileIsCompleted(payload?.user): true;

    // Return true only if all checks pass
    return isProfileComplete 
  }
  checkIfProfileIsCompleted(user: any): boolean {
    if (!user?.vendor && !user?.consultant) {
      // Redirect to the profile completion page if profile is incomplete
      this._router.navigate(['/user/user-profile']);
      return false;
    }
  
    return true;
  }
}
