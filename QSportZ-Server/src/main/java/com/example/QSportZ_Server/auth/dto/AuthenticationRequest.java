package com.example.QSportZ_Server.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    private String email;
    private String password;
    private String firstName;   // for register
    private String lastName;    // for register
    private String role;        // for register
}