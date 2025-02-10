import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainSkillMapping, MasterService, ResourceService, SubSkillMapping } from '../../../../services/api';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


import { AlertService } from '../../../../core/helpers/alert.service';




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
  constructor(
    private _fb: FormBuilder,
    private _master: MasterService,
    private _resource: ResourceService,

    private _alert: AlertService,
  ) {}

  ngOnInit(): void {
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
    });
  }

  get f() {
    return this.resourceForm.controls;
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      console.log('Form Data:', this.resourceForm.value);

      let payload = this.resourceForm.value;

      let mainSkills:Array<MainSkillMapping> = []
      payload.mainSkills.forEach((element) => {

        element['skillId'] = element.id;
        element['createdBy'] = 1;
        element['id'] = null;
        mainSkills.push(element)
      });
      let subSkills:Array<SubSkillMapping> = []
      payload.subSkills.forEach((element:SubSkillMapping) => {
        element['skillId'] = element.id;
        element['id'] = null;
        element['createdBy'] = 1;
        subSkills.push(element)
      });

      payload.mainSkills = mainSkills
      payload.subSkills = subSkills
      this._resource.resourceAdd(payload).subscribe(resp=>{
        if(resp.data){
          this._alert.success(resp.message  )
          this.ngOnInit()
        }
      })
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
}
