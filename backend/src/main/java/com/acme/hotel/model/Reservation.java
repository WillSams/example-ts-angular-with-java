package com.acme.hotel.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "reservation")
public class Reservation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "room_id", nullable = false)
  private String roomId;

  @Column(name = "checkin_date", nullable = false)
  private LocalDate checkinDate;

  @Column(name = "checkout_date", nullable = false)
  private LocalDate checkoutDate;

  @Column(name = "total_charge", nullable = false)
  private double totalCharge;

  public Reservation() {}

  public Reservation(
      String roomId, LocalDate checkinDate, LocalDate checkoutDate, double totalCharge) {
    this.roomId = roomId;
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
    this.totalCharge = totalCharge;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getRoomId() {
    return roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }

  public LocalDate getCheckinDate() {
    return checkinDate;
  }

  public void setCheckinDate(LocalDate checkinDate) {
    this.checkinDate = checkinDate;
  }

  public LocalDate getCheckoutDate() {
    return checkoutDate;
  }

  public void setCheckoutDate(LocalDate checkoutDate) {
    this.checkoutDate = checkoutDate;
  }

  public double getTotalCharge() {
    return totalCharge;
  }

  public void setTotalCharge(double totalCharge) {
    this.totalCharge = totalCharge;
  }
}
