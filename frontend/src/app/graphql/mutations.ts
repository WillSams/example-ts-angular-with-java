export const CREATE_RESERVATION = `
  mutation CreateReservation($input: ReservationInput!) {
    createReservation(input: $input) {
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

export const DELETE_RESERVATION = `
  mutation DeleteReservation($reservationId: Int!) {
    deleteReservation(reservationId: $reservationId) {
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
