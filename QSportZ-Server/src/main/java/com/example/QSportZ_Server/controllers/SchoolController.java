package com.example.QSportZ_Server.controllers;

import com.example.QSportZ_Server.models.SchoolDTO;
import com.example.QSportZ_Server.services.SchoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schools")
@RequiredArgsConstructor
@Validated
public class SchoolController {
    private final SchoolService schoolService;

    @PostMapping
    @PreAuthorize("hasRole('TEAM_ADMIN')")
    public ResponseEntity<SchoolDTO> createSchool(@Valid @RequestBody SchoolDTO dto) {
        return ResponseEntity.ok(schoolService.createSchool(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchoolDTO> getSchool(@PathVariable Long id) {
        return ResponseEntity.ok(schoolService.getSchool(id));
    }

    @GetMapping
    public ResponseEntity<List<SchoolDTO>> listSchools() {
        return ResponseEntity.ok(schoolService.listSchools());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('TEAM_ADMIN')")
    public ResponseEntity<SchoolDTO> updateSchool(
            @PathVariable Long id,
            @Valid @RequestBody SchoolDTO dto
    ) {
        return ResponseEntity.ok(schoolService.updateSchool(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEAM_ADMIN')")
    public ResponseEntity<Void> deleteSchool(@PathVariable Long id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }
}
