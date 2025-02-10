import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-multiselect-dropdown',
  standalone: false,

  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.css',
})
export class MultiselectDropdownComponent {
  @Input() control: any;
  @Input() data = [];
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeselect: EventEmitter<any> = new EventEmitter<any>();
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  onItemSelect(item: any) {
    // let value = this.control.value?this.control.value:[]
    // value.push(item)
    // this.control.setValue(value)
    console.log(this.control.value, 'contol');
    this.onSelect.emit(item);
  }
  onItemDeselect(item: any) {
    console.log(this.control.value, 'contol');
    this.onDeselect.emit(item);
  }
}
