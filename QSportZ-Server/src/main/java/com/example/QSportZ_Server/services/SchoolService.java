package com.example.QSportZ_Server.services;

import com.example.QSportZ_Server.entities.School;
import com.example.QSportZ_Server.exceptions.ResourceNotFoundException;
import com.example.QSportZ_Server.mappers.SchoolMapper;
import com.example.QSportZ_Server.models.SchoolDTO;
import com.example.QSportZ_Server.repositories.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final SchoolMapper schoolMapper;

    public SchoolDTO createSchool(SchoolDTO dto) {
        School school = schoolMapper.schoolDtoToSchool(dto);
        return schoolMapper.schoolToSchoolDto(schoolRepository.save(school));
    }

    public SchoolDTO getSchool(Long id) {
        return schoolRepository.findById(id)
                .map(schoolMapper::schoolToSchoolDto)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));
    }

    public List<SchoolDTO> listSchools() {
        return schoolRepository.findAll().stream()
                .map(schoolMapper::schoolToSchoolDto)
                .collect(Collectors.toList());
    }

    public SchoolDTO updateSchool(Long id, SchoolDTO dto) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + id));
        school.setName(dto.getName());
        school.setLocation(dto.getLocation());
        return schoolMapper.schoolToSchoolDto(schoolRepository.save(school));
    }

    public void deleteSchool(Long id) {
        if (!schoolRepository.existsById(id)) {
            throw new ResourceNotFoundException("School not found with id: " + id);
        }
        schoolRepository.deleteById(id);
    }
}