package com.example.QSportZ_Server.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasswordResetDTO {
    @NotBlank
    private String token;

    @NotBlank
    private String newPassword;
}
