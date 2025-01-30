import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  meetingNumber: string;
  userName: string;
  userEmail: string;
  passWord: string;
  places: any = [];
  errorMessage: string;
  isLoading: boolean;

  constructor(private http: HttpClient) {}
  file = new FormControl();
  ngOnInit(): void {}
}
