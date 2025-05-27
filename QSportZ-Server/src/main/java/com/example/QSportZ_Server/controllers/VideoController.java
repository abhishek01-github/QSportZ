package com.example.QSportZ_Server.controllers;

import com.example.QSportZ_Server.models.VideoDTO;
import com.example.QSportZ_Server.services.VideoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
@Validated
public class VideoController {
    private final VideoService videoService;

    /**
     * Expects multipart/form-data with:
     * - file: the video file
     * - metadata: JSON part matching VideoDTO (without videoUrl)
     */
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('TEAM_ADMIN') or hasRole('COACH')")
    public ResponseEntity<VideoDTO> uploadVideo(
            @RequestPart("file") MultipartFile file,
            @Valid @RequestPart("metadata") VideoDTO metadata
    ) throws IOException {
        return ResponseEntity.ok(videoService.uploadVideo(file, metadata));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoDTO> getVideo(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.getVideo(id));
    }

    @GetMapping("/by-school/{schoolId}")
    public ResponseEntity<List<VideoDTO>> listBySchool(@PathVariable Long schoolId) {
        return ResponseEntity.ok(videoService.listVideosBySchool(schoolId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEAM_ADMIN')")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}
