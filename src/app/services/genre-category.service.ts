import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  name: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class GenreCategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/categories.json');
  }
}
