package com.lyonelpierce.animaladoption.services;

import com.lyonelpierce.animaladoption.dtos.BreedDto;
import com.lyonelpierce.animaladoption.dtos.TypeDto;
import com.lyonelpierce.animaladoption.entities.Type;
import com.lyonelpierce.animaladoption.repositories.BreedRepository;
import com.lyonelpierce.animaladoption.repositories.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class TypeService {

    private final TypeRepository typeRepository;
    private final BreedRepository breedRepository;

    @Autowired
    public TypeService(TypeRepository typeRepository, BreedRepository breedRepository) {
        this.typeRepository = typeRepository;
        this.breedRepository = breedRepository;
    }

    public List<TypeDto> getAllTypes() {
        List<Type> types = typeRepository.findAll();
        return types.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TypeDto> getAllTypesWithoutBreeds() {
        List<Type> types = typeRepository.findAll();
        return types.stream()
                .filter(type -> breedRepository.existsByTypeId(type.getId()))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    public boolean addType(String typeName) {
        try {
            Type type = new Type();
            type.setName(typeName);
            typeRepository.save(type);
            return true;
        } catch (Exception e) {
            // Handle any exceptions or logging here
            return false;
        }
    }

    public boolean editType(Long id, String typeName) {
        try {
            Optional<Type> optionalType = typeRepository.findById(id);
            if (optionalType.isPresent()) {
                Type type = optionalType.get();
                type.setName(typeName);
                typeRepository.save(type);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            // Handle any exceptions or logging here
            return false;
        }
    }

    public boolean deleteType(Long id) {
        try {
            typeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            // Handle any exceptions or logging here
            return false;
        }
    }

    private TypeDto convertToDto(Type type) {
        return new TypeDto(type.getId(), type.getName());
    }
}
