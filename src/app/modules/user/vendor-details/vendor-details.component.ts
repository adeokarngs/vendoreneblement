import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionHelperService } from '../../../core/helpers/session-helper.service';
import { MasterService } from '../../../services/api';
import { VendorService } from '../../../services/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/helpers/alert.service';

@Component({
  selector: 'app-vendor-details',
  standalone: false,

  templateUrl: './vendor-details.component.html',
  styleUrl: './vendor-details.component.css'
})
export class VendorDetailsComponent {
  vendorForm: any;
  lstMasters: any = []
  constitutionOfBusiness: any;
  gstFiling: any;
  help: any;
  yesNo: any;

  /**
   *
   */
  constructor(private _alert: AlertService, private _router: Router, private _fb: FormBuilder, private _session: SessionHelperService, private _master: MasterService, private _vendor: VendorService) {

  }

  ngOnInit() {
    this.loadMasters()
    this.prepareForm()
    this.getDetails()
  }
  getDetails() {
    debugger
    const session = this._session.getCurrentUser();
    if (session) {
      const vendor = session?.user?.vendor
      if (vendor) {
        this.vendorForm.patchValue(vendor)
      }
    }
  }
  get f() { return this.vendorForm['controls']; }
  prepareForm() {
    this.vendorForm = this._fb.group({
      id: [0],
      userId: [this._session.getCurrentUser()?.user?.id],
      emailId: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      vendorName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      companyAddress: ['', [Validators.required, Validators.maxLength(500)]],
      cinLlpIn: ['', [Validators.required, Validators.maxLength(20)]],
      constitutionOfBusinessRid: ['', [Validators.required]],
      companyEstablished: ['', [Validators.required]],
      companyIncorporationNumberAndCertificate: ['', [Validators.required, Validators.maxLength(50)]],
      panCardFile: ['', [Validators.required, Validators.maxLength(100)]],
      msmeNumber: ['', [Validators.required]],
      gstinOrTaxId: ['', [Validators.required]],
      sezEntityDetails: ['', [Validators.required, Validators.maxLength(500)]],
      gstBillingAddress: ['', [Validators.required]],
      gstFilingFrequencyRid: ['', [Validators.required]],
      linkedinProfile: ['', [Validators.required, Validators.maxLength(200)]],
      companyWebsite: ['', [Validators.required, Validators.maxLength(200)]],
      teamSize: ['', [Validators.required]],
      assistanceDetailsRid: ['', [Validators.required]],
      relocationStates: ['', [Validators.required, Validators.maxLength(500)]],
      vendorContactNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      alternativeContactPointName: [''],
      alternativeContactNumber: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      alternativeContactEmail: ['', [Validators.email]],
      quarterlyRevenue: [''],
      openToBackgroundVerificationRid: [null, [Validators.required]],
      previousInvolvementWithUsRid: [null, [Validators.required]]
    });

  }

  loadMasters() {
    this._master.getByType(['CONSTITUTION_OF_BUSINESS', 'GST_FILING', 'HELP', 'YES_NO']).subscribe({
      next: (resp: any) => {
        this.lstMasters = resp.data;
        this.constitutionOfBusiness = this.getMasters(resp.data, 'CONSTITUTION_OF_BUSINESS');
        this.gstFiling = this.getMasters(resp.data, 'GST_FILING');
        this.help = this.getMasters(resp.data, 'HELP');
        this.yesNo = this.getMasters(resp.data, 'YES_NO');
      }
    })
  }

  getMasters(data, e: string) {
    return data.filter(x => x.type == e);
  }
  // Method to submit the form
  onSubmit(): void {
    this.vendorForm.markAllAsTouched()
    if (this.vendorForm.valid) {
      let vendor = this._session.getCurrentUser()?.user?.vendor
      if (vendor) {
        this._vendor.vendorUpdate(vendor?.id, this.vendorForm.value).subscribe({
          next: (resp: any) => {
            this._alert.success(resp.message)
            this.updateSession(resp.data)
            this._router.navigate(["/user/user-dashboard"])
          },
          error: (err: HttpErrorResponse) => {

          }
        })
      }
      else {


        this._vendor.vendorAdd(this.vendorForm.value).subscribe({
          next: (resp: any) => {
            this._alert.success(resp.message)
            this.updateSession(resp.data)
            this._router.navigate(["/user/user-dashboard"])
          },
          error: (err: HttpErrorResponse) => {

          }
        })
      }
    } else {
      console.log('Form is invalid');
    }
  }
  updateSession(data) {
    let session = this._session.getCurrentUser();
    session.user['vendor'] = data;
    this._session.setSession(session);
  }
}
