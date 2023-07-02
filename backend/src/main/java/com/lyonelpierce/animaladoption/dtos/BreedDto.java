package com.lyonelpierce.animaladoption.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BreedDto {
    private Long id;
    private String name;
    private TypeDto type;
}