import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) { }

  // HttpMethods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + 'register', user, this.noAuthHeader);
  }

  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrl + 'authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    const userPayload = this.getUserPayload();
    console.log(userPayload._id);

    return this.http.get(environment.apiBaseUrl + 'userProfile/' + userPayload._id);
  }

  // Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setFullName(fullName: string, email: string) {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
  }

  getFullName() {
    return localStorage.getItem('fullName');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
