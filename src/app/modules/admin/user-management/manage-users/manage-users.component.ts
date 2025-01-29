import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
   
  url = `${environment.BASE_URL_AI}/api/Users/get-user-grid`
  columns = [
    { name: 'ID', prop: 'id' },
    { name: 'Role', prop: 'role.name' },
    { name: 'Email', prop: 'email' }
  ];
}
