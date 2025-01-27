import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: false,

  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  vendorForm: any;

  /**
   *
   */
  constructor(private _fb: FormBuilder) {

  }

  ngOnInit() {
    this.prepareForm()
  }
  get f() { return this.vendorForm.controls; }
  prepareForm() {
    this.vendorForm = this._fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      vendorName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      cinLlpIn: ['', [Validators.required]],
      constitutionOfBusiness: ['', [Validators.required]],
      companyEstablished: ['', [Validators.required]],
      companyIncorporationNumberAndCertificate: ['', [Validators.required]],
      panCardFile: ['', [Validators.required]],
      msmeNumber: ['', [Validators.required]],
      gstinOrTaxId: ['', [Validators.required]],
      sezEntityDetails: ['', [Validators.required]],
      gstBillingAddress: ['', [Validators.required]],
      gstFilingFrequency: ['', [Validators.required]],
      linkedinProfile: ['', [Validators.required]],
      companyWebsite: ['', [Validators.required]],
      teamSize: ['', [Validators.required]],
      assistanceDetails: ['', [Validators.required]],
      relocationStates: ['', [Validators.required]],
      vendorContactNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      alternativeContactPointName: [''],
      alternativeContactNumber: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      alternativeContactEmail: ['', [Validators.email]],
      quarterlyRevenue: [''],
      openToBackgroundVerification: [false, [Validators.required]],
      previousInvolvementWithNGenious: [false, [Validators.required]]
    });
  }

  // Method to submit the form
  onSubmit(): void {
    if (this.vendorForm.valid) {
      console.log('Form Submitted!', this.vendorForm.value);
      // Call your service method to submit the data
    } else {
      console.log('Form is invalid');
    }
  }
}
