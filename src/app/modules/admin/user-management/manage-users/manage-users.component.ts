import { Component, TemplateRef, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-manage-users',
  standalone: false,

  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent {
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>
  url = `${environment.BASE_URL_AI}/api/Users/get-user-grid`;
  columns = [
    
  ];

  ngOnInit() {
    this.columns = [
      // { name: 'ID', prop: 'id' },
      { name: 'Role', prop: 'role.name' },
      { name: 'Email', prop: 'email' },
      {
        name: 'Actions',
        prop: '', // No data property needed for actions
        template: this.actionTemplate,
      },
    ];
  }
  edit(row: any): void {
    debugger;
    console.log('Edit clicked', row);
  }

  delete(row: any): void {
    console.log('Delete clicked', row);
  }
}
