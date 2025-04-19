import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: 'genre',
    loadComponent: () => import('./components/genre-list/genre-list.component').then((m) => m.GenreListComponent),
  },
  {
    path: 'user',
    component: UserComponent
  }
];
