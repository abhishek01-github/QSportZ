package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.models.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "schoolId", target = "school.id")
    User userDtoToUser(UserDTO dto);

    @Mapping(source = "school.id", target = "schoolId")
    UserDTO userToUserDto(User user);
}
