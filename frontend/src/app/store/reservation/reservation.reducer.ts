import { createReducer, on } from '@ngrx/store';
import { Reservation, Room } from '../../graphql/queries';
import * as ReservationActions from './reservation.actions';

export interface ReservationState {
  reservations: Reservation[];
  rooms: Room[];
  loading: boolean;
  error: string | null;
  alert: { message: string; alertType: string } | null;
  confirmModalOpen: boolean;
  pendingDeleteId: number | null;
}

export const initialState: ReservationState = {
  reservations: [],
  rooms: [],
  loading: false,
  error: null,
  alert: null,
  confirmModalOpen: false,
  pendingDeleteId: null,
};

export const reservationReducer = createReducer(
  initialState,

  // Load Reservations
  on(ReservationActions.loadReservations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.loadReservationsSuccess, (state, { reservations }) => ({
    ...state,
    loading: false,
    reservations,
  })),
  on(ReservationActions.loadReservationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Rooms
  on(ReservationActions.loadRooms, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    loading: false,
    rooms,
  })),
  on(ReservationActions.loadRoomsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Reservation
  on(ReservationActions.createReservation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ReservationActions.createReservationSuccess,
    (state, { reservations }) => ({
      ...state,
      loading: false,
      reservations,
      alert: {
        message: 'Reservation created successfully!',
        alertType: 'success',
      },
    }),
  ),
  on(ReservationActions.createReservationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    alert: { message: error, alertType: 'danger' },
  })),

  // Delete Reservation
  on(ReservationActions.deleteReservation, (state) => ({
    ...state,
    loading: true,
    error: null,
    confirmModalOpen: false,
    pendingDeleteId: null,
  })),
  on(
    ReservationActions.deleteReservationSuccess,
    (state, { reservations }) => ({
      ...state,
      loading: false,
      reservations,
      alert: {
        message: 'Reservation cancelled successfully.',
        alertType: 'success',
      },
    }),
  ),
  on(ReservationActions.deleteReservationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    alert: { message: error, alertType: 'danger' },
  })),

  // UI: Alert
  on(ReservationActions.setAlert, (state, { message, alertType }) => ({
    ...state,
    alert: { message, alertType },
  })),
  on(ReservationActions.clearAlert, (state) => ({
    ...state,
    alert: null,
  })),

  // UI: Confirmation Modal
  on(ReservationActions.openConfirmationModal, (state, { reservationId }) => ({
    ...state,
    confirmModalOpen: true,
    pendingDeleteId: reservationId,
  })),
  on(ReservationActions.confirmDeletion, (state) => ({
    ...state,
    confirmModalOpen: false,
  })),
  on(ReservationActions.cancelDeletion, (state) => ({
    ...state,
    confirmModalOpen: false,
    pendingDeleteId: null,
  })),
);
