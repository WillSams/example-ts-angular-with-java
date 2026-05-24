import { reservationReducer, initialState } from './reservation.reducer';
import * as ReservationActions from './reservation.actions';
import { Reservation, Room } from '../../graphql/queries';

const mockReservation: Reservation = {
  id: '1',
  room_id: 'room_1',
  checkin_date: '2026-06-01',
  checkout_date: '2026-06-03',
  total_charge: 250.0,
};

const mockRoom: Room = {
  id: 'room_1',
  num_beds: 2,
  allow_smoking: false,
  daily_rate: 100.0,
  cleaning_fee: 50.0,
};

describe('ReservationReducer', () => {
  it('should return the initial state for an unknown action', () => {
    const action = { type: '@@UNKNOWN' } as never;
    const state = reservationReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  describe('Load Reservations', () => {
    it('should set loading to true', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.loadReservations(),
      );
      expect(state.loading).toBeTrue();
      expect(state.error).toBeNull();
    });

    it('should populate reservations on success', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.loadReservationsSuccess({
          reservations: [mockReservation],
        }),
      );
      expect(state.loading).toBeFalse();
      expect(state.reservations).toEqual([mockReservation]);
    });

    it('should set error on failure', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.loadReservationsFailure({ error: 'fetch failed' }),
      );
      expect(state.loading).toBeFalse();
      expect(state.error).toBe('fetch failed');
    });
  });

  describe('Load Rooms', () => {
    it('should set loading to true', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.loadRooms(),
      );
      expect(state.loading).toBeTrue();
    });

    it('should populate rooms on success', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.loadRoomsSuccess({ rooms: [mockRoom] }),
      );
      expect(state.loading).toBeFalse();
      expect(state.rooms).toEqual([mockRoom]);
    });

    it('should set error on failure', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.loadRoomsFailure({ error: 'rooms failed' }),
      );
      expect(state.error).toBe('rooms failed');
    });
  });

  describe('Create Reservation', () => {
    it('should set loading to true', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.createReservation({
          room_id: 'room_1',
          checkin_date: '2026-06-01',
          checkout_date: '2026-06-03',
        }),
      );
      expect(state.loading).toBeTrue();
    });

    it('should update reservations and set success alert on success', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.createReservationSuccess({
          reservations: [mockReservation],
        }),
      );
      expect(state.loading).toBeFalse();
      expect(state.reservations).toEqual([mockReservation]);
      expect(state.alert?.alertType).toBe('success');
    });

    it('should set danger alert on failure', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.createReservationFailure({ error: 'room taken' }),
      );
      expect(state.alert?.alertType).toBe('danger');
      expect(state.alert?.message).toBe('room taken');
    });
  });

  describe('Delete Reservation', () => {
    it('should close modal and set loading on delete', () => {
      const preState = {
        ...initialState,
        confirmModalOpen: true,
        pendingDeleteId: 1,
      };
      const state = reservationReducer(
        preState,
        ReservationActions.deleteReservation({ reservationId: 1 }),
      );
      expect(state.loading).toBeTrue();
      expect(state.confirmModalOpen).toBeFalse();
      expect(state.pendingDeleteId).toBeNull();
    });

    it('should update reservations and set success alert on success', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.deleteReservationSuccess({ reservations: [] }),
      );
      expect(state.reservations).toEqual([]);
      expect(state.alert?.alertType).toBe('success');
    });

    it('should set danger alert on failure', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.deleteReservationFailure({ error: 'delete failed' }),
      );
      expect(state.alert?.alertType).toBe('danger');
    });
  });

  describe('UI: Alert', () => {
    it('should set an alert', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.setAlert({
          message: 'hello',
          alertType: 'warning',
        }),
      );
      expect(state.alert).toEqual({ message: 'hello', alertType: 'warning' });
    });

    it('should clear an alert', () => {
      const preState = {
        ...initialState,
        alert: { message: 'hello', alertType: 'info' },
      };
      const state = reservationReducer(
        preState,
        ReservationActions.clearAlert(),
      );
      expect(state.alert).toBeNull();
    });
  });

  describe('UI: Confirmation Modal', () => {
    it('should open the modal with the pending id', () => {
      const state = reservationReducer(
        initialState,
        ReservationActions.openConfirmationModal({ reservationId: 42 }),
      );
      expect(state.confirmModalOpen).toBeTrue();
      expect(state.pendingDeleteId).toBe(42);
    });

    it('should close the modal on confirmDeletion', () => {
      const preState = { ...initialState, confirmModalOpen: true };
      const state = reservationReducer(
        preState,
        ReservationActions.confirmDeletion(),
      );
      expect(state.confirmModalOpen).toBeFalse();
    });

    it('should close the modal and clear id on cancelDeletion', () => {
      const preState = {
        ...initialState,
        confirmModalOpen: true,
        pendingDeleteId: 5,
      };
      const state = reservationReducer(
        preState,
        ReservationActions.cancelDeletion(),
      );
      expect(state.confirmModalOpen).toBeFalse();
      expect(state.pendingDeleteId).toBeNull();
    });
  });
});
