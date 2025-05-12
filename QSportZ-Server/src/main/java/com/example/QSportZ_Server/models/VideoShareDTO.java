package com.example.QSportZ_Server.models;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoShareDTO {
    private Long id;

    @NotNull(message = "Video ID is required")
    private Long videoId;

    @NotNull(message = "Shared with user ID is required")
    private Long sharedWithUserId;

    @NotNull(message = "Shared by user ID is required")
    private Long sharedByUserId;
}
