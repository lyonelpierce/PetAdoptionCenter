package com.lyonelpierce.animaladoption.mappers;

import com.lyonelpierce.animaladoption.dtos.SignUpDto;
import com.lyonelpierce.animaladoption.dtos.UserDto;
import com.lyonelpierce.animaladoption.entities.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
