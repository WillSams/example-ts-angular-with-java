import { createAction, props } from '@ngrx/store';
import { Reservation, Room } from '../../graphql/queries';

// Load Reservations
export const loadReservations = createAction('[Reservation] Load Reservations');

export const loadReservationsSuccess = createAction(
  '[Reservation] Load Reservations Success',
  props<{ reservations: Reservation[] }>(),
);

export const loadReservationsFailure = createAction(
  '[Reservation] Load Reservations Failure',
  props<{ error: string }>(),
);

// Load Rooms
export const loadRooms = createAction('[Room] Load Rooms');

export const loadRoomsSuccess = createAction(
  '[Room] Load Rooms Success',
  props<{ rooms: Room[] }>(),
);

export const loadRoomsFailure = createAction(
  '[Room] Load Rooms Failure',
  props<{ error: string }>(),
);

// Create Reservation
export const createReservation = createAction(
  '[Reservation] Create Reservation',
  props<{ room_id: string; checkin_date: string; checkout_date: string }>(),
);

export const createReservationSuccess = createAction(
  '[Reservation] Create Reservation Success',
  props<{ reservations: Reservation[] }>(),
);

export const createReservationFailure = createAction(
  '[Reservation] Create Reservation Failure',
  props<{ error: string }>(),
);

// Delete Reservation
export const deleteReservation = createAction(
  '[Reservation] Delete Reservation',
  props<{ reservationId: number }>(),
);

export const deleteReservationSuccess = createAction(
  '[Reservation] Delete Reservation Success',
  props<{ reservations: Reservation[] }>(),
);

export const deleteReservationFailure = createAction(
  '[Reservation] Delete Reservation Failure',
  props<{ error: string }>(),
);

// UI: Alert
export const setAlert = createAction(
  '[UI] Set Alert',
  props<{
    message: string;
    alertType: 'success' | 'danger' | 'warning' | 'info';
  }>(),
);

export const clearAlert = createAction('[UI] Clear Alert');

// UI: Confirmation Modal
export const openConfirmationModal = createAction(
  '[UI] Open Confirmation Modal',
  props<{ reservationId: number }>(),
);

export const confirmDeletion = createAction('[UI] Confirm Deletion');

export const cancelDeletion = createAction('[UI] Cancel Deletion');
