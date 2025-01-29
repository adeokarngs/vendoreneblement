  import { Component } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { AuthService } from '../../../services/feartures/auth.service';
  import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
  import { CommonService } from '../../../core/helpers/common.service';
  import { HttpErrorResponse } from '@angular/common/http';
  import { switchMap } from 'rxjs';
  import { SessionHelperService } from '../../../core/helpers/session-helper.service';
  import { AuthenticationService, RoleService } from '../../../services/api';
  import { login, LoginComponent } from '../login/login.component';
import { MenuService } from '../../../core/helpers/menu.service';
import { RoleEnums } from '../../../core/constants/enums/RoleEnums';

  @Component({
    selector: 'app-registration',
    standalone: false,

    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
  })
  export class RegistrationComponent {
    registrationForm: FormGroup;
    objInvitation: any;
    invitationCode: string;

    constructor(private _role: RoleService,private _menu:MenuService,private _session:SessionHelperService,private _activateRoute: ActivatedRoute, private fb: FormBuilder, private _auth: AuthenticationService, private _router: Router, private _common: CommonService) { }

    ngOnInit(): void {
    
      this.invitationCode = this._activateRoute.snapshot.paramMap.get('code')
      this.getInvitationDetails(this.invitationCode)
      this.registrationForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        roleId: ['', [Validators.required]],
      });
    
    }

    getInvitationDetails(id: string) {
      this._auth.getInvite(id.toLocaleLowerCase())
      .subscribe({
        next: (resp: any) => {
          this.registrationForm.patchValue(resp.data)
          this.registrationForm.get("roleId").setValue(resp.data?.role?.name)
          this.objInvitation = resp.data;
          
        },
        error: (error: HttpErrorResponse) => {
          //alert(error.error.message);
          // this._router.navigateByUrl("/auth/login")
        }
      })
    }

    // Common getter function for form controls
    getControl(controlName: string) {
      return this.registrationForm.get(controlName);
    }

    onSubmit() {
      if (this.registrationForm.valid) {
        let payload = {
          ...this.registrationForm.value, 
          email: this.objInvitation.email, // Add email from objInvitation
          name: this.objInvitation.name  ,// Add name from objInvitation
          invitationId:this.invitationCode,
          roleId:this.objInvitation.roleId
        };
        this._auth.register(payload)
        .subscribe({
          next: (resp: any) => {
            if (resp) {
              const payload = {
                email: this.objInvitation.email,
                password:this.registrationForm.value.password
              }
              login(payload,this._auth,this._session,this._router,this._menu)
            }
          },
          error: (error: any) => {
          
          }
        })
      }
      else {
        this.registrationForm.markAllAsTouched()
      }
    }

 
  }
