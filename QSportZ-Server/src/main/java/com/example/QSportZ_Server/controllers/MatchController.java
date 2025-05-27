package com.example.QSportZ_Server.controllers;

import com.example.QSportZ_Server.enums.MatchResult;
import com.example.QSportZ_Server.models.MatchDTO;
import com.example.QSportZ_Server.services.MatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Validated
public class MatchController {
    private final MatchService matchService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MatchDTO> createMatch(@Valid @RequestBody MatchDTO dto) {
        return ResponseEntity.ok(matchService.createMatch(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchDTO> getMatch(@PathVariable Long id) {
        return ResponseEntity.ok(matchService.getMatch(id));
    }

    @GetMapping("/by-school/{schoolId}")
    public ResponseEntity<List<MatchDTO>> listBySchool(@PathVariable Long schoolId) {
        return ResponseEntity.ok(matchService.listMatchesBySchool(schoolId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MatchDTO> updateMatch(
            @PathVariable Long id,
            @Valid @RequestBody MatchDTO dto
    ) {
        return ResponseEntity.ok(matchService.updateMatch(id, dto));
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }
}
