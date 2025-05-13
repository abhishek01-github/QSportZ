package com.example.QSportZ_Server.auth;

import com.example.QSportZ_Server.auth.dto.AuthenticationRequest;
import com.example.QSportZ_Server.auth.dto.AuthenticationResponse;
import com.example.QSportZ_Server.config.JwtService;
import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.enums.Role;
import com.example.QSportZ_Server.models.UserDTO;
import com.example.QSportZ_Server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthenticationResponse register(AuthenticationRequest req) {
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

    public AuthenticationResponse authenticate(AuthenticationRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        User user = userRepo.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthenticationResponse(token);
    }
}
