package com.example.QSportZ_Server.controllers;

import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.exceptions.ResourceNotFoundException;
import com.example.QSportZ_Server.models.UserDTO;
import com.example.QSportZ_Server.repositories.UserRepository;
import com.example.QSportZ_Server.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/{id}/photo-url")
    public ResponseEntity<String> getPhotoUrl(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        String fullUrl = user.getProfilePhotoUrl();
        if (fullUrl == null || fullUrl.isEmpty()) {
            throw new ResourceNotFoundException("No profile photo found for user id: " + id);
        }

        String key = fullUrl.substring(fullUrl.indexOf("profiles/"));
        String presignedUrl = userService.generatePresignedUrl(key);
        return ResponseEntity.ok().body(presignedUrl);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> listUsers() {
        return ResponseEntity.ok(userService.listUsers());
    }

    @PutMapping("/{id}")
    @PreAuthorize("#id == principal.id")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO dto
    ) {
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == principal.id")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{userId}/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("#userId == principal.id")
    public ResponseEntity<UserDTO> uploadPhoto(
            @PathVariable Long userId,
            @RequestPart("file") MultipartFile file
    ) throws IOException {
        String url = userService.uploadProfilePhoto(file, userId);
        UserDTO updated = userService.updatePhotoUrl(userId, url);
        return ResponseEntity.ok(updated);
    }
}
