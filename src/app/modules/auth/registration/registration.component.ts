import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,

  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private _auth: AuthService,private _router:Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Common getter function for form controls
  getControl(controlName: string) {
    return this.registrationForm.get(controlName);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this._auth.register(this.registrationForm.value).subscribe({
        next: (resp: any) => {
          if(resp){
            alert("Registration Successfull");
            this._router.navigateByUrl("auth/login")
          }
        },
        error: (error: any) => {
          alert("Oops!! Something Went Wrong.")
        }
      })
    }
    else {
      this.registrationForm.markAllAsTouched()
    }
  }
}
