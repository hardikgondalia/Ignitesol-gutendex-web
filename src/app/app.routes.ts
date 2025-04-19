import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';

export const routes: Routes = [
  {
    path: 'genre',
    component: GenreListComponent
    // loadComponent: () => import("./components/genre-list.component").then((m) => m.GenreListComponent),
  },
  {
    path: 'user',
    component: UserComponent
  }
];
