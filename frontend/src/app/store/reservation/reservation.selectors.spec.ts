import {
  selectReservations,
  selectRooms,
  selectLoading,
  selectError,
  selectAlert,
  selectConfirmModalOpen,
  selectPendingDeleteId,
} from './reservation.selectors';
import { initialState, ReservationState } from './reservation.reducer';
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

const buildAppState = (slice: Partial<ReservationState> = {}) => ({
  reservation: { ...initialState, ...slice },
});

describe('ReservationSelectors', () => {
  it('should select reservations', () => {
    const state = buildAppState({ reservations: [mockReservation] });
    expect(selectReservations(state)).toEqual([mockReservation]);
  });

  it('should select an empty reservations list from initial state', () => {
    expect(selectReservations(buildAppState())).toEqual([]);
  });

  it('should select rooms', () => {
    const state = buildAppState({ rooms: [mockRoom] });
    expect(selectRooms(state)).toEqual([mockRoom]);
  });

  it('should select loading', () => {
    expect(selectLoading(buildAppState({ loading: true }))).toBeTrue();
    expect(selectLoading(buildAppState({ loading: false }))).toBeFalse();
  });

  it('should select error', () => {
    expect(selectError(buildAppState({ error: 'oops' }))).toBe('oops');
    expect(selectError(buildAppState())).toBeNull();
  });

  it('should select alert', () => {
    const alert = { message: 'done', alertType: 'success' };
    expect(selectAlert(buildAppState({ alert }))).toEqual(alert);
    expect(selectAlert(buildAppState())).toBeNull();
  });

  it('should select confirmModalOpen', () => {
    expect(
      selectConfirmModalOpen(buildAppState({ confirmModalOpen: true })),
    ).toBeTrue();
    expect(selectConfirmModalOpen(buildAppState())).toBeFalse();
  });

  it('should select pendingDeleteId', () => {
    expect(selectPendingDeleteId(buildAppState({ pendingDeleteId: 7 }))).toBe(
      7,
    );
    expect(selectPendingDeleteId(buildAppState())).toBeNull();
  });
});
