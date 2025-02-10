import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/feartures/auth.service';
import { RoleService } from '../../../services/api';
import { RoleEnums } from '../../../core/constants/enums/RoleEnums';

@Component({
  selector: 'app-invite-user',
  standalone: false,

  templateUrl: './invite-user.component.html',
  styleUrl: './invite-user.component.css',
})
export class InviteUserComponent {
  registrationForm: FormGroup;
  showInvite: boolean;
  invitationLink: string;
  lstRoles: any = [];

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _role: RoleService,
  ) {}

  ngOnInit(): void {
    this.loasMasters();
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
    });
  }
  loasMasters() {
    this._role.roleList().subscribe({
      next: (resp: any) => {
        if (resp) {
          this.lstRoles = resp.data.filter((x) =>
            [RoleEnums.Consultant, RoleEnums.Vendor].includes(x.code),
          );
        }
      },
    });
  }
  // Common getter function for form controls
  getControl(controlName: string) {
    return this.registrationForm.get(controlName);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this._auth.inviteUser(this.registrationForm.value).subscribe({
        next: (resp: any) => {
          if (resp) {
            this.registrationForm.reset();
            this.showEmailBody(resp.data.code);
          }
        },
        error: (error: any) => {},
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
  showEmailBody(code: any) {
    this.showInvite = true;
    this.invitationLink = 'auth/registration/' + code;
  }

  gotoRegistration() {
    this._router.navigateByUrl(this.invitationLink);
  }
}
