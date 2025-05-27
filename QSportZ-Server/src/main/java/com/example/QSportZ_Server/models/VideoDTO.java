package com.example.QSportZ_Server.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoDTO {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @URL(message = "Invalid video URL")
    private String videoUrl;

    @NotNull(message = "Uploader ID is required")
    private Long uploadedById;

    @NotNull(message = "School ID is required")
    private Long schoolId;

    private Long matchId;
}
