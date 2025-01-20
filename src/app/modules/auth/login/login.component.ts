import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SessionHelperService } from '../../../core/helpers/session-helper.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  constructor(private _fb: FormBuilder,private _auth:AuthService,private _router:Router,private _session:SessionHelperService) {

  }
  ngOnInit() {
    this.intiailizeForm()
    this._session.checkSessionPersistence()
  }

  intiailizeForm() {
    this.loginForm = this._fb.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]],
    })
  }
  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value).subscribe({
        next:(resp:any)=>{
          if(resp){
              this._session.setSession(resp.data)
              this._router.navigateByUrl('vendor/test')
          }
        },
        error:(err:Error)=>{
          alert(err.message)
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}
