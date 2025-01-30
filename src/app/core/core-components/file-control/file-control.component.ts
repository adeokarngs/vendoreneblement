import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-file-control',
  standalone: false,

  templateUrl: './file-control.component.html',
  styleUrl: './file-control.component.css',
})
export class FileControlComponent {
  @Input() acceptedFileTypes: string[] = ['image/jpeg', 'image/png']; // File types (can be passed as input)
  @Input() maxSizeMB: number = 5; // Max file size in MB (can be passed as input)
  @Input() control: FormControl; // FormControl name for the file GUID (can be passed as input)

  selectedFile: File | null = null;
  uploading: boolean = false;
  uploadError: boolean = false;
  uploadedFile: any | null = null;
  @ViewChild('file') file: ElementRef;
  valueChange: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private cdref: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.handleValueChange();
  }

  handleValueChange() {
    this.valueChange = this.control.valueChanges.subscribe({
      next: (resp: any) => {
        this.http
          .get(environment.BASE_URL + 'Files/getfile?fid=' + resp)
          .subscribe({
            next: (resp: any) => {
              this.uploadedFile = resp.data[0];
            },
          });
      },
    });
  }
  // Handle file change and validate
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // Size in MB
      this.control.setErrors(null);
      // Check file type
      if (!this.acceptedFileTypes.includes(fileType)) {
        this.control.setErrors({ invalidFileType: true });
        this.file.nativeElement.value = '';
        return;
      }

      // Check file size
      if (fileSize > this.maxSizeMB) {
        this.control.setErrors({ fileTooLarge: true });
        this.file.nativeElement.value = '';
        return;
      }

      this.selectedFile = file;
      this.onUpload();
    }
  }

  // Handle file upload
  onUpload(): void {
    if (this.control.invalid || !this.selectedFile) {
      return;
    }

    this.uploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // API URL for file upload
    const uploadUrl = environment.BASE_URL + 'Files/upload';

    this.http.post<{ guid: string }>(uploadUrl, formData).subscribe(
      (response: any) => {
        this.uploading = false;
        this.uploadedFile = response.data;
        this.valueChange.unsubscribe();
        this.control.setValue(response.data.fid);
        this.uploadError = false;
        this.handleValueChange();
      },
      () => {
        this.uploading = false;
        this.uploadError = true;
        this.file.nativeElement.value = '';
      },
    );
  }

  // Handle file deletion
  onDelete(): void {
    this.valueChange.unsubscribe();
    this.resetFileUpload();
    this.handleValueChange();
    // const deleteUrl = `https://your-backend-api/delete-endpoint/${this.control.value}`;
    // this.http.delete(deleteUrl).subscribe(() => {
    //   this.resetFileUpload();
    // });
  }
  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.valueChange) {
      this.valueChange.unsubscribe();
    }
  }
  // Reset file upload state
  resetFileUpload(): void {
    this.selectedFile = null;
    this.uploadedFile = null;
    this.control.reset();
    this.file.nativeElement.value = '';
  }

  // Check if the file is uploaded
}
