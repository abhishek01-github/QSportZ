package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.models.UserDTO;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {

    User userDtoToUser(UserDTO dto);

    UserDTO userToUserDto(User user);
}
