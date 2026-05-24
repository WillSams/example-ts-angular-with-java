package com.acme.hotel.service;

import com.acme.hotel.model.Reservation;
import com.acme.hotel.model.Room;
import com.acme.hotel.repository.ReservationRepository;
import com.acme.hotel.repository.RoomRepository;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

  private final ReservationRepository reservationRepository;
  private final RoomRepository roomRepository;

  public ReservationService(
      ReservationRepository reservationRepository, RoomRepository roomRepository) {
    this.reservationRepository = reservationRepository;
    this.roomRepository = roomRepository;
  }

  public List<Reservation> getAllReservations() {
    return reservationRepository.findAll();
  }

  public Reservation getReservationById(Long id) {
    return reservationRepository
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Reservation not found with id: " + id));
  }

  public List<Reservation> createReservation(
      String roomId, LocalDate checkinDate, LocalDate checkoutDate) {
    // Validate check-in is in the future
    if (!checkinDate.isAfter(LocalDate.now())) {
      throw new IllegalArgumentException("Check-in date must be in the future");
    }

    // Validate checkout is after checkin
    if (!checkoutDate.isAfter(checkinDate)) {
      throw new IllegalArgumentException("Check-out date must be after check-in date");
    }

    // Check for overlapping reservations
    List<Reservation> overlapping =
        reservationRepository.findOverlappingReservations(roomId, checkinDate, checkoutDate);
    if (!overlapping.isEmpty()) {
      throw new IllegalArgumentException("Reservation dates overlap with an existing reservation");
    }

    // Fetch room for pricing
    Room room =
        roomRepository
            .findById(roomId)
            .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + roomId));

    // Compute total charge
    long nights = ChronoUnit.DAYS.between(checkinDate, checkoutDate);
    double totalCharge = room.getDailyRate() * nights + room.getCleaningFee();

    // Save
    Reservation reservation = new Reservation(roomId, checkinDate, checkoutDate, totalCharge);
    reservationRepository.save(reservation);

    return reservationRepository.findAll();
  }

  public List<Reservation> deleteReservation(Long reservationId) {
    Reservation reservation =
        reservationRepository
            .findById(reservationId)
            .orElseThrow(
                () ->
                    new IllegalArgumentException(
                        "Reservation not found with id: " + reservationId));

    reservationRepository.delete(reservation);
    return reservationRepository.findAll();
  }
}
