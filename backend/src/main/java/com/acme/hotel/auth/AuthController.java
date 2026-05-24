package com.acme.hotel.auth;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/development")
public class AuthController {

  private static final String VALID_USERNAME = "example-user";
  private static final String VALID_PASSWORD = "example-user";
  private static final int EXPIRES_IN_SECONDS = 3600;

  private final JwtUtil jwtUtil;

  public AuthController(JwtUtil jwtUtil) {
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/token")
  public ResponseEntity<?> getToken(
      @RequestParam("grant_type") String grantType,
      @RequestParam("username") String username,
      @RequestParam("password") String password) {

    if (!VALID_USERNAME.equals(username) || !VALID_PASSWORD.equals(password)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(
              Map.of(
                  "error",
                  "invalid_credentials",
                  "error_description",
                  "Invalid username or password"));
    }

    String token = jwtUtil.generateToken(username);

    return ResponseEntity.ok(
        Map.of(
            "access_token", token,
            "token_type", "bearer",
            "expires_in", EXPIRES_IN_SECONDS));
  }
}
