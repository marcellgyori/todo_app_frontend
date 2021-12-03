import { Injectable } from '@angular/core';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): any {
    return this.http.post(`${environment.api_url}/register`, user);
  }

  login(user: User): any {
    return this.http.post(`${environment.api_url}/login`, user).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }
}
