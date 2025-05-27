package com.example.QSportZ_Server.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchDTO {
    private Long id;

    @NotNull(message = "Match date is required")
    private LocalDate matchDate;

    @NotNull(message = "First school ID is required")
    private Long schoolOneId;

    @NotNull(message = "Second school ID is required")
    private Long schoolTwoId;

    private String winnerSchoolName;

    @NotBlank(message = "Score is required")
    private String score; // e.g., "2-1"
}
