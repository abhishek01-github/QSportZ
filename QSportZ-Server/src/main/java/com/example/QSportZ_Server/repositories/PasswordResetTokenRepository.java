package com.example.QSportZ_Server.repositories;

import com.example.QSportZ_Server.entities.PasswordResetToken;
import com.example.QSportZ_Server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUser(User user);
}
