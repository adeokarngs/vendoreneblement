import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionHelperService } from '../../../core/helpers/session-helper.service';
import { AuthenticationService } from '../../../services/api';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  isCaptchaValid: boolean = false;
  constructor(private _fb: FormBuilder, private _auth: AuthenticationService, private _router: Router, private _session: SessionHelperService) {

  }
  ngOnInit() {
    this.intiailizeForm()
    this._session.checkSessionPersistence()
  }

  intiailizeForm() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }
  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      if (this.isCaptchaValid) {
        login(this.loginForm.value, this._auth, this._session, this._router)
      }
      else {
        alert("Please enter the captcha.")
      }

    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }

  onCaptchaValidated(e: any) {
    this.isCaptchaValid = e;
  }

}
export function login(payload: any, _auth: AuthenticationService, _session: SessionHelperService, _router: Router) {
  return _auth.login(payload).subscribe({
    next: (resp: any) => {
      if (resp) {
        if (_session.setSession(resp.data)) {
          _router.navigate(['/user/user-dashboard'])
        }
      }
    }
  });
}