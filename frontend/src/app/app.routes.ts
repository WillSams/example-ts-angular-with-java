import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./screens/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'reservations/new',
    loadComponent: () =>
      import('./screens/reservations/new/new-reservation.component').then(
        (m) => m.NewReservationComponent,
      ),
  },
  {
    path: 'reservations/:id',
    loadComponent: () =>
      import('./screens/reservations/show/show-reservation.component').then(
        (m) => m.ShowReservationComponent,
      ),
  },
  {
    path: 'reservations/:id/edit',
    loadComponent: () =>
      import('./screens/reservations/edit/edit-reservation.component').then(
        (m) => m.EditReservationComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./screens/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
