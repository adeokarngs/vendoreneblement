import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-server-grid',
  standalone: false,

  templateUrl: './server-grid.component.html',
  styleUrl: './server-grid.component.css',
})
export class ServerGridComponent {
  @Input() apiUrl!: string; // Backend API URL
  @Input() columns: GridColumn[] = []; // Column Config
  @Input() uData: any; // Column Config
  @Input() showActionButtons: boolean = false // Column Config

  @Output() onView: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  rows: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;

  pageSize: number = 10;
  pageNumber: number = 0;
  sortColumn: string = '';
  sortOrder: string = '';

  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkActionButtons();
    this.loadData();
  }
  checkActionButtons() {
    if (this.showActionButtons == true) {
      if (this.columns) {
        this.columns.push({
          name: 'Actions',
          prop: '', // No data property needed for actions
          template: this.actionTemplate,
        });
      }
    }
  }
  loadData(): void {
    this.loading = true;
    const params = {
      page: this.pageNumber,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortOrder: this.sortOrder,
    };
    if (this.uData) {
      const keys = Object.keys(this.uData);
      keys.forEach((element) => {
        params[element] = this.uData[element];
      });
    }
    this.http
      .get<{ data: any; total: number }>(this.apiUrl, { params })
      .subscribe({
        next: (response) => {
          this.rows = response.data?.pageData;
          this.totalRecords = response.data?.total;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  onSort(event: any): void {
    const sort = event.sorts[0];
    this.sortColumn = sort.prop;
    this.sortOrder = sort.dir;
    this.loadData();
  }

  onPage(event: any): void {
    this.pageNumber = event.offset;
    this.pageSize = event.limit;
    this.loadData();
  }

  view(row: any) {
    this.onView.emit(row);
  }
  edit(row: any): void {
    this.onEdit.emit(row);
  }

  delete(row: any): void {
    this.onDelete.emit(row);
  }

  getTemplateColumns() {
    this.columns.filter((x) => x?.template);
  }
}
export interface GridColumn {
  name: string;
  prop?: string;
  template?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  footerTemplate?: TemplateRef<any>;
  flexGrow?: number;
  minWidth?: number;
}
