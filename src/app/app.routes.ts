import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: 'genre',
    loadComponent: () => import('./components/genre-list/genre-list.component').then((m) => m.GenreListComponent),
  },
  {
    path: 'genre/book/:category',
    loadComponent: () => import('./components/book-list/book-list.component').then((m) => m.BookListComponent),
  },
  {
    path: 'user',
    component: UserComponent
  }
];
