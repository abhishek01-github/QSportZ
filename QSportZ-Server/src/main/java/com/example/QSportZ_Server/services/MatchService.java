package com.example.QSportZ_Server.services;

import com.example.QSportZ_Server.entities.Match;
import com.example.QSportZ_Server.exceptions.ResourceNotFoundException;
import com.example.QSportZ_Server.mappers.MatchMapper;
import com.example.QSportZ_Server.models.MatchDTO;
import com.example.QSportZ_Server.repositories.MatchRepository;
import com.example.QSportZ_Server.repositories.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;
    private final SchoolRepository schoolRepository;

    public MatchDTO createMatch(MatchDTO dto) {
        Match match = matchMapper.matchDtoToMatch(dto);
        return matchMapper.matchToMatchDto(matchRepository.save(match));
    }

    public MatchDTO getMatch(Long id) {
        return matchRepository.findById(id)
                .map(matchMapper::matchToMatchDto)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with id: " + id));
    }

    public List<MatchDTO> listMatchesBySchool(Long schoolId) {
        return matchRepository.findBySchoolAIdOrSchoolBId(schoolId, schoolId).stream()
                .map(matchMapper::matchToMatchDto)
                .collect(Collectors.toList());
    }

    public MatchDTO updateMatch(Long id, MatchDTO dto) {
        matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with id: " + id));

        Match updated = matchMapper.matchDtoToMatch(dto);
        updated.setId(id);

        Match saved = matchRepository.save(updated);
        return matchMapper.matchToMatchDto(saved);
    }


    public void deleteMatch(Long id) {
        if (!matchRepository.existsById(id)) {
            throw new ResourceNotFoundException("Match not found with id: " + id);
        }
        matchRepository.deleteById(id);
    }
}