import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Exercise #1: Show Reservation Detail
 *
 * Implement this component to display the details of a single reservation.
 *
 * Requirements:
 * - Read the reservation ID from the route params (ActivatedRoute)
 * - Dispatch the getReservation query via the store or HttpClient
 * - Display: room_id, checkin_date, checkout_date, total_charge
 * - Show a loading spinner while fetching
 * - Show an error message if the reservation is not found
 * - Add a Back button that navigates to /home
 * - Add an Edit button that navigates to /reservations/:id/edit
 */
@Component({
  selector: 'app-show-reservation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="alert alert-info">
        <strong>Exercise #1:</strong> Implement the Show Reservation detail
        view. See the comments in <code>show-reservation.component.ts</code> for
        requirements.
      </div>
      <a routerLink="/home" class="btn btn-secondary">&larr; Back to Home</a>
    </div>
  `,
})
export class ShowReservationComponent {
  // Exercise #1: Implement reservation detail view
}
