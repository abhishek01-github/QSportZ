package com.example.QSportZ_Server.auth;

import com.example.QSportZ_Server.auth.dto.AuthenticationRequest;
import com.example.QSportZ_Server.auth.dto.AuthenticationResponse;
import com.example.QSportZ_Server.config.JwtService;
import com.example.QSportZ_Server.entities.PasswordResetToken;
import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.enums.Role;
import com.example.QSportZ_Server.exceptions.ResourceNotFoundException;
import com.example.QSportZ_Server.models.UserDTO;
import com.example.QSportZ_Server.repositories.PasswordResetTokenRepository;
import com.example.QSportZ_Server.repositories.UserRepository;
import com.example.QSportZ_Server.services.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final PasswordResetTokenRepository tokenRepo;
    private final EmailSenderService emailSender;

    private static final Duration EXPIRE_DURATION = Duration.ofHours(1);

    public AuthenticationResponse register(AuthenticationRequest req) {
        if (Role.ADMIN.name().equalsIgnoreCase(req.getRole())) {
            throw new IllegalArgumentException("Admin registration is not allowed through this endpoint.");
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setRole(Role.valueOf(req.getRole()));
        userRepo.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse registerAdmin(AuthenticationRequest req) {
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setRole(Role.ADMIN);
        userRepo.save(user);

        String token = jwtService.generateToken(user.getEmail(), Role.ADMIN.name());
        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        User user = userRepo.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthenticationResponse(token);
    }

    public void requestPasswordReset(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No user with that email"));

        // Generate a fresh token and expiry
        String newToken = UUID.randomUUID().toString();
        LocalDateTime newExpiry = LocalDateTime.now().plus(EXPIRE_DURATION);

        // Look up any existing token for this user
        PasswordResetToken prt = tokenRepo.findByUser(user)
                .map(existing -> {
                    // Update the existing record
                    existing.setToken(newToken);
                    existing.setExpiresAt(newExpiry);
                    return existing;
                })
                .orElseGet(() -> {
                    // No record yet: create a new one
                    return new PasswordResetToken(null, newToken, newExpiry, user);
                });

        // Save (either updates or inserts)
        tokenRepo.save(prt);

        // Send the email
        String link = "http://localhost:5173/reset-password?token=" + newToken;
        emailSender.send(
                email,
                "QSportz Password Reset",
                "Click to reset your password: " + link
        );
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken prt = tokenRepo.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reset token"));

        if (prt.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Reset token has expired");
        }

        User user = prt.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepo.save(user);

        // Invalidate token
        tokenRepo.delete(prt);
    }
}
