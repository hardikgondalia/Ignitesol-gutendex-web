import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/genre-list/genre-list.component').then((m) => m.GenreListComponent),
  },
  {
    path: 'genre',
    loadComponent: () => import('./components/genre-list/genre-list.component').then((m) => m.GenreListComponent),
  },
  {
    path: 'genre/book/:category',
    loadComponent: () => import('./components/book-list/book-list.component').then((m) => m.BookListComponent),
  }
];
