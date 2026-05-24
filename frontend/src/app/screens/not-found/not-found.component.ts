import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mt-5 text-center">
      <h1 class="display-1 text-muted">404</h1>
      <h2>Page Not Found</h2>
      <p class="text-muted">The page you are looking for does not exist.</p>
      <a routerLink="/home" class="btn btn-primary">Go to Home</a>
    </div>
  `,
})
export class NotFoundComponent {}
