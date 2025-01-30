import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  CONTEXT = 'Authentication/';
  API_URL = `${environment.BASE_URL}${this.CONTEXT}`;
  constructor(private _http: HttpClient) {}

  login(payload: any) {
    return this._http.post(this.API_URL + 'login', payload);
  }
  register(payload: any) {
    return this._http.post(this.API_URL + 'register', payload);
  }
  inviteUser(payload: any) {
    return this._http.post(this.API_URL + 'send-invite', payload);
  }

  getInvitationDetails(id: string) {
    return this._http.get(this.API_URL + 'get-invite?code=' + id);
  }
}
