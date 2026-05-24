package com.acme.hotel.graphql;

import com.acme.hotel.model.Reservation;
import com.acme.hotel.service.ReservationService;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ReservationResolver {

  private final ReservationService reservationService;

  public ReservationResolver(ReservationService reservationService) {
    this.reservationService = reservationService;
  }

  @QueryMapping
  public Map<String, Object> getAllReservations() {
    try {
      List<Reservation> reservations = reservationService.getAllReservations();
      Map<String, Object> result = new HashMap<>();
      result.put("success", true);
      result.put("errors", null);
      result.put("reservations", reservations.stream().map(this::toMap).toList());
      return result;
    } catch (Exception e) {
      return errorResult(e.getMessage());
    }
  }

  @QueryMapping
  public Map<String, Object> getReservation(@Argument String id) {
    try {
      Reservation reservation = reservationService.getReservationById(Long.parseLong(id));
      Map<String, Object> result = new HashMap<>();
      result.put("success", true);
      result.put("errors", null);
      result.put("reservations", List.of(toMap(reservation)));
      return result;
    } catch (Exception e) {
      return errorResult(e.getMessage());
    }
  }

  @MutationMapping
  public Map<String, Object> createReservation(@Argument Map<String, String> input) {
    try {
      String roomId = input.get("room_id");
      LocalDate checkinDate = LocalDate.parse(input.get("checkin_date"));
      LocalDate checkoutDate = LocalDate.parse(input.get("checkout_date"));

      List<Reservation> reservations =
          reservationService.createReservation(roomId, checkinDate, checkoutDate);
      Map<String, Object> result = new HashMap<>();
      result.put("success", true);
      result.put("errors", null);
      result.put("reservations", reservations.stream().map(this::toMap).toList());
      return result;
    } catch (DateTimeParseException e) {
      return errorResult("Invalid date format. Use YYYY-MM-DD");
    } catch (Exception e) {
      return errorResult(e.getMessage());
    }
  }

  @MutationMapping
  public Map<String, Object> deleteReservation(@Argument Integer reservationId) {
    try {
      List<Reservation> reservations =
          reservationService.deleteReservation(reservationId.longValue());
      Map<String, Object> result = new HashMap<>();
      result.put("success", true);
      result.put("errors", null);
      result.put("reservations", reservations.stream().map(this::toMap).toList());
      return result;
    } catch (Exception e) {
      return errorResult(e.getMessage());
    }
  }

  private Map<String, Object> toMap(Reservation reservation) {
    Map<String, Object> map = new HashMap<>();
    map.put("id", String.valueOf(reservation.getId()));
    map.put("room_id", reservation.getRoomId());
    map.put("checkin_date", reservation.getCheckinDate().toString());
    map.put("checkout_date", reservation.getCheckoutDate().toString());
    map.put("total_charge", reservation.getTotalCharge());
    return map;
  }

  private Map<String, Object> errorResult(String message) {
    Map<String, Object> result = new HashMap<>();
    result.put("success", false);
    result.put("errors", List.of(message));
    result.put("reservations", null);
    return result;
  }
}
