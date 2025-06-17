package com.example.QSportZ_Server.auth;

import com.example.QSportZ_Server.auth.dto.AuthenticationRequest;
import com.example.QSportZ_Server.auth.dto.AuthenticationResponse;
import com.example.QSportZ_Server.auth.dto.PasswordResetDTO;
import com.example.QSportZ_Server.auth.dto.PasswordResetRequestDTO;
import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.mappers.UserMapper;
import com.example.QSportZ_Server.models.UserDTO;
import com.example.QSportZ_Server.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authService;
    private final UserRepository userRepository;

    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest req) {
        return ResponseEntity.ok(authService.register(req));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register/admin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody AuthenticationRequest req) {
        return ResponseEntity.ok(authService.registerAdmin(req));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest req) {
        return ResponseEntity.ok(authService.authenticate(req));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        return ResponseEntity.ok(userMapper.userToUserDto(user));
    }

    /** Step 1: request reset link by email */
    @PostMapping("/password/request")
    public ResponseEntity<Void> requestReset(
            @Valid @RequestBody PasswordResetRequestDTO dto
    ) {
        authService.requestPasswordReset(dto.getEmail());
        return ResponseEntity.ok().build();
    }

    /** Step 2: actually reset using token */
    @PostMapping("/password/reset")
    public ResponseEntity<Void> resetPassword(
            @Valid @RequestBody PasswordResetDTO dto
    ) {
        authService.resetPassword(dto.getToken(), dto.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
