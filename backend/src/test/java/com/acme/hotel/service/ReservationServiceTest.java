package com.acme.hotel.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.acme.hotel.model.Reservation;
import com.acme.hotel.model.Room;
import com.acme.hotel.repository.ReservationRepository;
import com.acme.hotel.repository.RoomRepository;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ReservationServiceTest {

  @Autowired private ReservationService reservationService;

  @Autowired private ReservationRepository reservationRepository;

  @Autowired private RoomRepository roomRepository;

  private Room testRoom;

  @BeforeEach
  void setUp() {
    testRoom = new Room("test_room_1", 2, false, 100.0, 25.0);
    roomRepository.save(testRoom);
  }

  @Test
  void createReservation_success() {
    LocalDate checkin = LocalDate.now().plusDays(5);
    LocalDate checkout = LocalDate.now().plusDays(8);

    List<Reservation> result =
        reservationService.createReservation("test_room_1", checkin, checkout);

    assertThat(result).isNotEmpty();
    Reservation created =
        result.stream().filter(r -> r.getRoomId().equals("test_room_1")).findFirst().orElseThrow();

    assertThat(created.getRoomId()).isEqualTo("test_room_1");
    assertThat(created.getCheckinDate()).isEqualTo(checkin);
    assertThat(created.getCheckoutDate()).isEqualTo(checkout);
    // 3 nights * 100 + 25 = 325
    assertThat(created.getTotalCharge()).isEqualTo(325.0);
  }

  @Test
  void createReservation_checkinInPast_throwsException() {
    LocalDate checkin = LocalDate.now().minusDays(1);
    LocalDate checkout = LocalDate.now().plusDays(2);

    assertThatThrownBy(() -> reservationService.createReservation("test_room_1", checkin, checkout))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessageContaining("Check-in date must be in the future");
  }

  @Test
  void createReservation_checkinIsToday_throwsException() {
    LocalDate checkin = LocalDate.now();
    LocalDate checkout = LocalDate.now().plusDays(2);

    assertThatThrownBy(() -> reservationService.createReservation("test_room_1", checkin, checkout))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessageContaining("Check-in date must be in the future");
  }

  @Test
  void createReservation_overlapping_throwsException() {
    LocalDate checkin = LocalDate.now().plusDays(5);
    LocalDate checkout = LocalDate.now().plusDays(10);

    reservationService.createReservation("test_room_1", checkin, checkout);

    // Overlapping dates
    LocalDate checkin2 = LocalDate.now().plusDays(7);
    LocalDate checkout2 = LocalDate.now().plusDays(12);

    assertThatThrownBy(
            () -> reservationService.createReservation("test_room_1", checkin2, checkout2))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessageContaining("overlap");
  }

  @Test
  void createReservation_nonOverlapping_success() {
    LocalDate checkin1 = LocalDate.now().plusDays(5);
    LocalDate checkout1 = LocalDate.now().plusDays(8);
    reservationService.createReservation("test_room_1", checkin1, checkout1);

    // Non-overlapping dates for same room
    LocalDate checkin2 = LocalDate.now().plusDays(10);
    LocalDate checkout2 = LocalDate.now().plusDays(12);

    List<Reservation> result =
        reservationService.createReservation("test_room_1", checkin2, checkout2);
    assertThat(result).hasSize(2);
  }

  @Test
  void deleteReservation_success() {
    LocalDate checkin = LocalDate.now().plusDays(5);
    LocalDate checkout = LocalDate.now().plusDays(8);
    List<Reservation> created =
        reservationService.createReservation("test_room_1", checkin, checkout);
    Long reservationId = created.get(0).getId();

    List<Reservation> remaining = reservationService.deleteReservation(reservationId);
    assertThat(remaining).isEmpty();
  }

  @Test
  void deleteReservation_notFound_throwsException() {
    assertThatThrownBy(() -> reservationService.deleteReservation(9999L))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessageContaining("Reservation not found");
  }

  @Test
  void getAllReservations_returnsAll() {
    LocalDate checkin1 = LocalDate.now().plusDays(5);
    LocalDate checkout1 = LocalDate.now().plusDays(8);
    reservationService.createReservation("test_room_1", checkin1, checkout1);

    List<Reservation> all = reservationService.getAllReservations();
    assertThat(all).hasSize(1);
  }

  @Test
  void totalCharge_calculatedCorrectly() {
    LocalDate checkin = LocalDate.now().plusDays(1);
    LocalDate checkout = LocalDate.now().plusDays(4); // 3 nights

    List<Reservation> result =
        reservationService.createReservation("test_room_1", checkin, checkout);
    Reservation reservation = result.get(0);

    // 3 nights * 100 daily_rate + 25 cleaning_fee = 325
    assertThat(reservation.getTotalCharge()).isEqualTo(325.0);
  }
}
