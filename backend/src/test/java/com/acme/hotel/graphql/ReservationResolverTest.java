package com.acme.hotel.graphql;

import static org.assertj.core.api.Assertions.assertThat;

import com.acme.hotel.model.Room;
import com.acme.hotel.repository.ReservationRepository;
import com.acme.hotel.repository.RoomRepository;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@Transactional
class ReservationResolverTest {

  @Autowired private GraphQlTester graphQlTester;

  @Autowired private ReservationRepository reservationRepository;

  @Autowired private RoomRepository roomRepository;

  @BeforeEach
  void setUp() {
    Room room = new Room("gql_test_room", 2, false, 150.0, 30.0);
    roomRepository.save(room);
  }

  @Test
  void getAllReservations_returnsSuccessResult() {
    graphQlTester
        .document(
            """
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
                """)
        .execute()
        .path("getAllReservations.success")
        .entity(Boolean.class)
        .isEqualTo(true)
        .path("getAllReservations.reservations")
        .entityList(Object.class)
        .hasSize(0);
  }

  @Test
  void getAllRooms_returnsSuccessResult() {
    graphQlTester
        .document(
            """
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
                """)
        .execute()
        .path("getAllRooms.success")
        .entity(Boolean.class)
        .isEqualTo(true);
  }

  @Test
  void createReservation_success() {
    LocalDate checkin = LocalDate.now().plusDays(10);
    LocalDate checkout = LocalDate.now().plusDays(13);

    graphQlTester
        .document(
            """
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
                """)
        .variable(
            "input",
            java.util.Map.of(
                "room_id", "gql_test_room",
                "checkin_date", checkin.toString(),
                "checkout_date", checkout.toString()))
        .execute()
        .path("createReservation.success")
        .entity(Boolean.class)
        .isEqualTo(true)
        .path("createReservation.reservations[0].room_id")
        .entity(String.class)
        .isEqualTo("gql_test_room");
  }

  @Test
  void createReservation_checkinInPast_returnsError() {
    LocalDate checkin = LocalDate.now().minusDays(1);
    LocalDate checkout = LocalDate.now().plusDays(2);

    graphQlTester
        .document(
            """
                mutation CreateReservation($input: ReservationInput!) {
                  createReservation(input: $input) {
                    success
                    errors
                    reservations {
                      id
                    }
                  }
                }
                """)
        .variable(
            "input",
            java.util.Map.of(
                "room_id", "gql_test_room",
                "checkin_date", checkin.toString(),
                "checkout_date", checkout.toString()))
        .execute()
        .path("createReservation.success")
        .entity(Boolean.class)
        .isEqualTo(false)
        .path("createReservation.errors[0]")
        .entity(String.class)
        .satisfies(error -> assertThat(error).contains("future"));
  }

  @Test
  void deleteReservation_notFound_returnsError() {
    graphQlTester
        .document(
            """
                mutation {
                  deleteReservation(reservationId: 9999) {
                    success
                    errors
                  }
                }
                """)
        .execute()
        .path("deleteReservation.success")
        .entity(Boolean.class)
        .isEqualTo(false)
        .path("deleteReservation.errors[0]")
        .entity(String.class)
        .satisfies(error -> assertThat(error).contains("not found"));
  }
}
