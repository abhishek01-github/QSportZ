package com.example.QSportZ_Server.controllers;

import com.example.QSportZ_Server.models.VideoShareDTO;
import com.example.QSportZ_Server.services.VideoShareService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shares")
@RequiredArgsConstructor
@Validated
public class VideoShareController {
    private final VideoShareService shareService;

    @PostMapping
    public ResponseEntity<VideoShareDTO> shareVideo(
            @Valid @RequestBody VideoShareDTO dto
    ) {
        return ResponseEntity.ok(shareService.shareVideo(dto));
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<VideoShareDTO>> listShares(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(shareService.listSharesByUser(userId));
    }

    @DeleteMapping("/{shareId}")
    public ResponseEntity<Void> unshareVideo(
            @PathVariable Long shareId,
            Authentication authentication
    ) {
        VideoShareDTO share = shareService.getShareById(shareId);
        Long callerId = ((com.example.QSportZ_Server.entities.User) authentication.getPrincipal()).getId();

        if (!callerId.equals(share.getSharedByUserId())) {
            throw new AccessDeniedException("You can only unshare videos you originally shared");
        }

        shareService.unshareVideo(shareId);
        return ResponseEntity.noContent().build();
    }
}
