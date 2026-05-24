import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationState } from './reservation.reducer';

export const selectReservationFeature =
  createFeatureSelector<ReservationState>('reservation');

export const selectReservations = createSelector(
  selectReservationFeature,
  (state) => state.reservations,
);

export const selectRooms = createSelector(
  selectReservationFeature,
  (state) => state.rooms,
);

export const selectLoading = createSelector(
  selectReservationFeature,
  (state) => state.loading,
);

export const selectError = createSelector(
  selectReservationFeature,
  (state) => state.error,
);

export const selectAlert = createSelector(
  selectReservationFeature,
  (state) => state.alert,
);

export const selectConfirmModalOpen = createSelector(
  selectReservationFeature,
  (state) => state.confirmModalOpen,
);

export const selectPendingDeleteId = createSelector(
  selectReservationFeature,
  (state) => state.pendingDeleteId,
);
