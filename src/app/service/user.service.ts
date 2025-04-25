import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  API_URL = 'https://jsonplaceholder.typicode.com/';
  getUserPhotos(lastnameLength: any) {
    const photo_url = this.API_URL + 'photos/' + lastnameLength;
    return this.http.get<any>(photo_url);
  }

  register(user: User) {
    const save_url = this.API_URL + '/users';
    return this.http.post<any>(save_url,user);
  }
}