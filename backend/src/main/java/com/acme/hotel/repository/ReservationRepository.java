package com.acme.hotel.repository;

import com.acme.hotel.model.Reservation;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

  @Query(
      "SELECT r FROM Reservation r WHERE r.roomId = :roomId "
          + "AND r.checkinDate < :checkoutDate AND r.checkoutDate > :checkinDate")
  List<Reservation> findOverlappingReservations(
      @Param("roomId") String roomId,
      @Param("checkinDate") LocalDate checkinDate,
      @Param("checkoutDate") LocalDate checkoutDate);
}
