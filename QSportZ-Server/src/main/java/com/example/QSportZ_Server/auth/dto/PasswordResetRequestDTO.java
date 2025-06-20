package com.example.QSportZ_Server.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasswordResetRequestDTO {
    @Email @NotBlank
    private String email;
}