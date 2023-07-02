package com.lyonelpierce.animaladoption.services;

import com.lyonelpierce.animaladoption.dtos.BreedDto;
import com.lyonelpierce.animaladoption.dtos.TypeDto;
import com.lyonelpierce.animaladoption.entities.Breed;
import com.lyonelpierce.animaladoption.entities.Type;
import com.lyonelpierce.animaladoption.repositories.BreedRepository;
import com.lyonelpierce.animaladoption.repositories.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BreedService {

    private final BreedRepository breedRepository;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    public BreedService(BreedRepository breedRepository) {
        this.breedRepository = breedRepository;
    }


    public List<BreedDto> getAllBreeds() {
        List<Breed> breeds = breedRepository.findAll();
        return breeds.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<BreedDto> getBreedsByTypeId(Long typeId) {
        List<Breed> breeds = breedRepository.findByTypeId(typeId);
        return breeds.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BreedDto addBreed(BreedDto breedDto) {
        Breed breed = convertToEntity(breedDto);

        // Retrieve the Type entity based on the typeId in the BreedDto
        Optional<Type> optionalType = typeRepository.findById(breedDto.getType().getId());
        if (optionalType.isPresent()) {
            Type type = optionalType.get();
            breed.setType(type);
        } else {
            // Handle the case where the specified type does not exist
            throw new IllegalArgumentException("Invalid type ID: " + breedDto.getType().getId());
        }

        Breed savedBreed = breedRepository.save(breed);
        return convertToDto(savedBreed);
    }

    public BreedDto editBreed(Long id, BreedDto breedDto) {
        // Check if the breed with the given ID exists
        Optional<Breed> optionalBreed = breedRepository.findById(id);
        if (optionalBreed.isPresent()) {
            Breed breed = optionalBreed.get();

            // Update the breed properties
            breed.setName(breedDto.getName());

            // Retrieve the Type entity based on the typeId in the BreedDto
            Optional<Type> optionalType = typeRepository.findById(breedDto.getType().getId());
            if (optionalType.isPresent()) {
                Type type = optionalType.get();
                breed.setType(type);
            } else {
                // Handle the case where the specified type does not exist
                throw new IllegalArgumentException("Invalid type ID: " + breedDto.getType().getId());
            }

            // Save the updated breed
            Breed updatedBreed = breedRepository.save(breed);
            return convertToDto(updatedBreed);
        } else {
            // Handle the case where the breed with the given ID does not exist
            throw new IllegalArgumentException("Invalid breed ID: " + id);
        }
    }

    public void deleteBreed(Long id) {
        breedRepository.deleteById(id);
    }

    private Breed convertToEntity(BreedDto breedDto) {
        // Convert BreedDto to Breed entity
        Breed breed = new Breed();
        breed.setName(breedDto.getName());

        return breed;
    }

    private BreedDto convertToDto(Breed breed) {
        TypeDto typeDto = new TypeDto(breed.getType().getId(), breed.getType().getName());
        return new BreedDto(breed.getId(), breed.getName(), typeDto);
    }}
