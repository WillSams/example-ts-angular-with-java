package com.acme.hotel.service;

import com.acme.hotel.model.Room;
import com.acme.hotel.repository.RoomRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

  private final RoomRepository roomRepository;

  public RoomService(RoomRepository roomRepository) {
    this.roomRepository = roomRepository;
  }

  public List<Room> getAllRooms() {
    return roomRepository.findAll();
  }
}
