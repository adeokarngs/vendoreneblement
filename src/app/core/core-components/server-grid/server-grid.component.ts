import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-grid',
  standalone: false,

  templateUrl: './server-grid.component.html',
  styleUrl: './server-grid.component.css'
})
export class ServerGridComponent {
  @Input() apiUrl!: string; // Backend API URL
  @Input() columns: { name: string; prop: string }[] = []; // Column Config

  rows: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;

  pageSize: number = 10;
  pageNumber: number = 0;
  sortColumn: string = '';
  sortOrder: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    debugger
    this.loading = true;
    const params = {
      page: this.pageNumber,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortOrder: this.sortOrder
    };
    
    this.http.get<{ data: any; total: number }>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.rows = response.data?.pageData;
        this.totalRecords = response.data?.total;;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  onSort(event: any): void {
    const sort = event.sorts[0];
    this.sortColumn = sort.prop;
    this.sortOrder = sort.dir;
    this.loadData();
  }

  onPage(event: any): void {
    this.pageNumber = event.offset ;
    this.pageSize = event.limit;
    this.loadData();
  }

  edit(row: any): void {
    console.log('Edit clicked', row);
    // Implement edit logic
  }

  delete(row: any): void {
    console.log('Delete clicked', row);
    // Implement delete logic
  }

}
