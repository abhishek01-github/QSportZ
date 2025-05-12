package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.School;
import com.example.QSportZ_Server.models.SchoolDTO;
import org.mapstruct.Mapper;

@Mapper
public interface SchoolMapper {

    School schoolDtoToSchool(SchoolDTO dto);

    SchoolDTO schoolToSchoolDto(School school);
}
