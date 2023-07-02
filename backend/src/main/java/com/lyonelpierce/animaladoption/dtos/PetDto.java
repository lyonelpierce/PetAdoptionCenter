package com.lyonelpierce.animaladoption.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PetDto {
    private Long id;
    private String name;
    private Integer age;
    private String genre;
    private String description;
    private Boolean status;
    private String image;
    private BreedDto breed;
    private TypeDto type;
}