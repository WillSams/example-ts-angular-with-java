export interface Reservation {
  id: string;
  room_id: string;
  checkin_date: string;
  checkout_date: string;
  total_charge: number;
}

export interface Room {
  id: string;
  num_beds: number;
  allow_smoking: boolean;
  daily_rate: number;
  cleaning_fee: number;
}

export interface ReservationResult {
  success: boolean;
  errors: string[] | null;
  reservations: Reservation[] | null;
}

export interface RoomResult {
  success: boolean;
  errors: string[] | null;
  rooms: Room[] | null;
}

export const GET_ALL_RESERVATIONS = `
  query {
    getAllReservations {
      success
      errors
      reservations {
        id
        room_id
        checkin_date
        checkout_date
        total_charge
      }
    }
  }
`;

export const GET_ALL_ROOMS = `
  query {
    getAllRooms {
      success
      errors
      rooms {
        id
        num_beds
        allow_smoking
        daily_rate
        cleaning_fee
      }
    }
  }
`;

export const GET_RESERVATION = `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
      success
      errors
      reservations {
        id
        room_id
        checkin_date
        checkout_date
        total_charge
      }
    }
  }
`;
