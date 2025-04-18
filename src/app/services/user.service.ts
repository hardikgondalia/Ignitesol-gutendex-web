import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { delay, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'assets/users.json'; // Using local JSON file
  private users: any[] = [];
  private loaded = false;
  constructor(private api: ApiService, private http: HttpClient) { }

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.api.get<ApiResponse<User[]>>('users');
  }

  getUser(id: number): Observable<ApiResponse<User>> {
    return this.api.get<ApiResponse<User>>(`users/${id}`);
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.api.post<ApiResponse<User>>('users', user);
  }

  updateUser(id: number, user: User): Observable<ApiResponse<User>> {
    return this.api.put<ApiResponse<User>>(`users/${id}`, user);
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.api.delete<ApiResponse<void>>(`users/${id}`);
  }

  getUserList(page: number, limit: number = 10): Observable<any> {
    if (!this.loaded) {
      return this.http.get(this.apiUrl).pipe(
        delay(500),
        tap((data: any) => {
          this.users = data.users;
          this.loaded = true;
        }),
        map(() => this.paginateUsers(page, limit))
      );
    } else {
      return of(this.paginateUsers(page, limit)).pipe(delay(500));
    }
  }

  private paginateUsers(page: number, limit: number): any {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      users: this.users.slice(start, end),
      hasMore: end < this.users.length
    };
  }
}
