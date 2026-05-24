import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Exercise #2: Edit Reservation
 *
 * Implement this component to allow editing an existing reservation.
 *
 * Requirements:
 * - Read the reservation ID from the route params (ActivatedRoute)
 * - Fetch the current reservation data and pre-populate the form
 * - Implement a form with: room_id (dropdown), checkin_date, checkout_date
 * - On submit, dispatch a mutation to update the reservation
 *   (hint: you may need to add an updateReservation mutation to the GraphQL schema
 *    and implement it in the backend, or use delete + create)
 * - On success, navigate to /home
 * - Show validation errors inline
 * - Add a Cancel button that navigates back to /reservations/:id
 */
@Component({
  selector: 'app-edit-reservation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="alert alert-info">
        <strong>Exercise #2:</strong> Implement the Edit Reservation form. See
        the comments in <code>edit-reservation.component.ts</code> for
        requirements.
      </div>
      <a routerLink="/home" class="btn btn-secondary">&larr; Back to Home</a>
    </div>
  `,
})
export class EditReservationComponent {
  // Exercise #2: Implement reservation edit form
}
