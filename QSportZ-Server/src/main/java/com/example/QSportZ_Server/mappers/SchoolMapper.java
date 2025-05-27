package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.School;
import com.example.QSportZ_Server.models.SchoolDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SchoolMapper {

    @Mapping(source = "adminId", target = "admin.id")
    School schoolDtoToSchool(SchoolDTO dto);

    @Mapping(source = "admin.id", target = "adminId")
    SchoolDTO schoolToSchoolDto(School school);
}
