package com.acme.hotel.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "room")
public class Room {

  @Id private String id;

  @Column(name = "num_beds", nullable = false)
  private int numBeds;

  @Column(name = "allow_smoking", nullable = false)
  private boolean allowSmoking;

  @Column(name = "daily_rate", nullable = false)
  private double dailyRate;

  @Column(name = "cleaning_fee", nullable = false)
  private double cleaningFee;

  public Room() {}

  public Room(String id, int numBeds, boolean allowSmoking, double dailyRate, double cleaningFee) {
    this.id = id;
    this.numBeds = numBeds;
    this.allowSmoking = allowSmoking;
    this.dailyRate = dailyRate;
    this.cleaningFee = cleaningFee;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public int getNumBeds() {
    return numBeds;
  }

  public void setNumBeds(int numBeds) {
    this.numBeds = numBeds;
  }

  public boolean isAllowSmoking() {
    return allowSmoking;
  }

  public void setAllowSmoking(boolean allowSmoking) {
    this.allowSmoking = allowSmoking;
  }

  public double getDailyRate() {
    return dailyRate;
  }

  public void setDailyRate(double dailyRate) {
    this.dailyRate = dailyRate;
  }

  public double getCleaningFee() {
    return cleaningFee;
  }

  public void setCleaningFee(double cleaningFee) {
    this.cleaningFee = cleaningFee;
  }
}
