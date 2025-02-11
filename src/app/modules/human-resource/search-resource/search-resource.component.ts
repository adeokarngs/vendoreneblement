import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResourceService } from '../../../services/api';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-resource',
  standalone: false,

  templateUrl: './search-resource.component.html',
  styleUrl: './search-resource.component.css',
})
export class SearchResourceComponent {
  searchForm: FormGroup;
  page = 1;
  objSearchResult: any;
  pager = {
    page: this.page - 1,
    pageSize: 5,
    uData: null,
    total:0
  };
  constructor(
    private _fb: FormBuilder,
    private _resource: ResourceService,
  ) {}
  ngOnInit() {
    this.prepareForm();
  }

  prepareForm() {
    this.searchForm = this._fb.group({
      query: [null, [Validators.required]],
    });
  }
  changePage(e) {
    if (this.pager.total > 0) {
      let payload = {
        page: e - 1,
        pageSize: this.pager.pageSize,
        uData: this.searchForm.value,
      };
      this.search(payload);
    }
  }
  search(payload = null) {
    let searchPayload = payload
      ? payload
      : {
          page: this.page - 1,
          pageSize: this.pager.pageSize,
          uData: this.searchForm.value,
        };
    this._resource
      .searchResource(searchPayload)
      .pipe(debounceTime(300))
      .subscribe({
        next: (resp: any) => {
          debugger
          this.objSearchResult = resp.data.pageData;
          this.pager.total =  resp.data.total;
          
        },
      });
  }
  commaSeparated(skills){
    return skills?.map(ms => ms.skill.value).join(', ') 
  }
}
