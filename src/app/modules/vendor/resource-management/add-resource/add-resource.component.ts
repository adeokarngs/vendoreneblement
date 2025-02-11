import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  MainSkillMapping,
  MasterService,
  ResourceService,
  SubSkillMapping,
} from '../../../../services/api';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { AlertService } from '../../../../core/helpers/alert.service';
import { SessionHelperService } from '../../../../core/helpers/session-helper.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  standalone: false,

  templateUrl: './add-resource.component.html',
  styleUrl: './add-resource.component.css',
})
export class AddResourceComponent {
  resourceForm!: FormGroup;
  lstGenders = [];
  lstMasters: any;
  lstMainSkill: any;
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  skillsList = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Bangaluru' },
    { item_id: 3, item_text: 'Pune' },
    { item_id: 4, item_text: 'Navsari' },
    { item_id: 5, item_text: 'New Delhi' },
  ];
  lstSubSkill: any[] = [];
  currentUser: any;
  id: any = null;
  objResource: any;
  constructor(
    private _fb: FormBuilder,
    private _master: MasterService,
    private _resource: ResourceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,

    private _alert: AlertService,
    private _session: SessionHelperService,
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.currentUser = this._session.getCurrentUser();
    if (this.id) {
      this.loadResourceDetails(this.id);
    }
    this.loadMasters();
    this.resourceForm = this._fb.group({
      id: [],
      createdDate: [new Date()],
      createdBy: [1],
      updatedDate: [new Date()],
      updatedBy: [1],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      genderId: [null, Validators.required],
      age: [
        null,
        [Validators.required, Validators.min(18), Validators.max(65)],
      ],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', [Validators.required, Validators.maxLength(200)]],
      mainSkills: ['', Validators.required],
      subSkills: ['', Validators.required],
      vendorDetailsId: [this.currentUser?.user?.vendor?.id],
      addresses: this._fb.array([], Validators.required),
      contacts: this._fb.array([], Validators.required),
    });
  }
  loadResourceDetails(id) {
    this._resource.resourceById(id).subscribe((rep) => {
      this.objResource = rep.data;
      this.objResource.contacts.forEach((element) => {
        this.addContact();
      });
      this.objResource.addresses.forEach((element) => {
        this.addAddress();
      });
      this.resourceForm.patchValue(this.objResource);
      const mainSkills = this.objResource.mainSkills.map((item) => ({
        id: item.skill.id,
        skillId: item.skillId,
        value: item.skill.value,
      }));
      this.resourceForm.get('mainSkills').setValue(mainSkills);
      mainSkills.forEach((element) => {
        this.getSubSkills(element);
      });
      // console.log(mainSkills,"maindSkil")

      this.resourceForm.get('subSkills').setValue(
        this.objResource.subSkills.map((item) => ({
          id: item.skill.id,
          skillId: item.skillId,
          value: item.skill.value,
        })),
      );
    });
  }
  get f() {
    return this.resourceForm.controls;
  }

  onSubmit(): void {
    this.resourceForm.markAllAsTouched();
    if (this.resourceForm.valid) {
      console.log('Form Data:', this.resourceForm.value);

      let payload = this.resourceForm.value;

      let mainSkills: Array<MainSkillMapping> = [];
      payload.mainSkills.forEach((element) => {

        const id = this.objResource.mainSkills.find(x=>x.skillId == element.id)?.id;
        element['skillId'] = element.id;
        element['createdBy'] = 1;
        element['id'] = id?id:null;
        mainSkills.push(element);
      });
      let subSkills: Array<SubSkillMapping> = [];
      payload.subSkills.forEach((element: SubSkillMapping) => {
        const id = this.objResource.subSkills.find(x=>x.skillId == element.id)?.id;

        element['skillId'] = element.id;
        element['id'] =   id?id:null;
        element['createdBy'] = 1;
        subSkills.push(element);
      });

      payload.mainSkills = mainSkills;
      payload.subSkills = subSkills;
      // if (!this.id) {
      //   this._resource.resourceAdd(payload).subscribe((resp) => {
      //     if (resp.data) {
      //       this._alert.success(resp.message);
      //       this._router.navigateByUrl('/vendor/resource-management');
      //     }
      //   });
      // } else {
      //   this._resource.resourceUpdate(this.id,payload).subscribe((resp) => {
      //     if (resp.data) {
      //       this._alert.success(resp.message);
      //       this._router.navigateByUrl('/vendor/resource-management');
      //     }
      //   });
      // }
    } else {
      console.log('Form is invalid');
    }
  }
  onItemSelect(item: any) {
    console.log(item);
  }

  loadMasters() {
    this._master.getByType(['GENDER', 'MAIN_SKILL']).subscribe({
      next: (resp: any) => {
        this.lstMasters = resp.data;
        this.lstGenders = this.lstMasters.filter((x) => x.type == 'GENDER');
        this.lstMainSkill = this.lstMasters.filter(
          (x) => x.type == 'MAIN_SKILL',
        );
      },
    });
  }
  getFormControl(e) {
    return this.resourceForm.controls[e];
  }
  getSubSkills(e) {
    this._master.getByParentId(e.id).subscribe({
      next: (resp: any) => {
        this.lstSubSkill = [...this.lstSubSkill, ...resp.data];
        console.log(this.lstSubSkill);
      },
    });
  }
  removeSubSkills(e) {
    const value = this.resourceForm.get('subSkills').value;
    if (value) {
      this.resourceForm
        .get('subSkills')
        .setValue(value.filter((x) => x.parentId != e.id));
    }
    this.lstSubSkill = this.lstSubSkill.filter((x) => x.parentId != e.id);
  }

  //#region contact
  createContact(): FormGroup {
    return this._fb.group({
      id: [null],
      createdBy: [0],
      updatedBy: [0],
      createdDate: [new Date()], // or set as an empty string if needed: ['']
      updatedDate: [new Date()], // or set as an empty string if needed: ['']
      resourceId: [null],
      phoneNo: ['', Validators.required],
    });
  }

  // Getter to access the FormArray controls
  get contacts(): FormArray {
    return this.resourceForm.get('contacts') as FormArray;
  }

  // Method to add a new contact to the FormArray
  addContact(): void {
    this.contacts.push(this.createContact());
  }

  // Method to remove a contact at a given index from the FormArray
  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }
  //#endregion

  //#region Address
  // Getter for addresses FormArray
  get addresses(): FormArray {
    return this.resourceForm.get('addresses') as FormArray;
  }

  // Create a new address FormGroup with required fields
  createAddress(): FormGroup {
    return this._fb.group({
      id: [null],
      createdBy: [0],
      updatedBy: [0],
      createdDate: [new Date()],
      updatedDate: [new Date()],
      resourceId: [null],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      pincode: ['', Validators.required],
      landmark: ['', Validators.required],
    });
  }

  // Add a new address to the FormArray
  addAddress(): void {
    this.addresses.push(this.createAddress());
  }

  // Remove an address from the FormArray at a given index
  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  //#endregion
}
