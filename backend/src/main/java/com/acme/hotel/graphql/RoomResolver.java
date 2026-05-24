package com.acme.hotel.graphql;

import com.acme.hotel.model.Room;
import com.acme.hotel.service.RoomService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class RoomResolver {

  private final RoomService roomService;

  public RoomResolver(RoomService roomService) {
    this.roomService = roomService;
  }

  @QueryMapping
  public Map<String, Object> getAllRooms() {
    try {
      List<Room> rooms = roomService.getAllRooms();
      Map<String, Object> result = new HashMap<>();
      result.put("success", true);
      result.put("errors", null);
      result.put("rooms", rooms.stream().map(this::toMap).toList());
      return result;
    } catch (Exception e) {
      Map<String, Object> result = new HashMap<>();
      result.put("success", false);
      result.put("errors", List.of(e.getMessage()));
      result.put("rooms", null);
      return result;
    }
  }

  private Map<String, Object> toMap(Room room) {
    Map<String, Object> map = new HashMap<>();
    map.put("id", room.getId());
    map.put("num_beds", room.getNumBeds());
    map.put("allow_smoking", room.isAllowSmoking());
    map.put("daily_rate", room.getDailyRate());
    map.put("cleaning_fee", room.getCleaningFee());
    return map;
  }
}
