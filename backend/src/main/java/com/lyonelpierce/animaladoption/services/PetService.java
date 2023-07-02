package com.lyonelpierce.animaladoption.services;

import com.lyonelpierce.animaladoption.dtos.BreedDto;
import com.lyonelpierce.animaladoption.dtos.PetDto;
import com.lyonelpierce.animaladoption.dtos.TypeDto;
import com.lyonelpierce.animaladoption.entities.Breed;
import com.lyonelpierce.animaladoption.entities.Pet;
import com.lyonelpierce.animaladoption.entities.Type;
import com.lyonelpierce.animaladoption.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PetService {

    private final PetRepository petRepository;

    @Autowired
    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<PetDto> getAllPets() {
        List<Pet> petList = petRepository.findAll();
        return petList.stream()
                .map(this::mapPetToDto)
                .collect(Collectors.toList());
    }

    public String addPet(MultipartFile image, Pet pet) {
        String fileName = saveImage(image);
        pet.setImage(fileName);
        petRepository.save(pet);
        return "Pet added successfully";
    }

    public boolean updatePetStatus(Long id) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            boolean currentStatus = pet.getStatus();
            pet.setStatus(!currentStatus);
            petRepository.save(pet);
            return true;
        }
        return false;
    }

    public boolean deletePet(Long id) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            petRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean editPet(Long id, MultipartFile image, Pet updatedPet) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            if (image != null && !image.isEmpty()) {
                String fileName = saveImage(image);
                pet.setImage(fileName);
            }
            updatePetProperties(pet, updatedPet);
            petRepository.save(pet);
            return true;
        }
        return false;
    }

    public boolean editPetWithoutImage(Long id, Pet updatedPet) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            updatePetProperties(pet, updatedPet);
            petRepository.save(pet);
            return true;
        }
        return false;
    }

    private void updatePetProperties(Pet pet, Pet updatedPet) {
        pet.setName(updatedPet.getName());
        pet.setAge(updatedPet.getAge());
        pet.setDescription(updatedPet.getDescription());
        pet.setGenre(updatedPet.getGenre());
        pet.setType(updatedPet.getType());
        pet.setBreed(updatedPet.getBreed());
    }

    public PetDto mapPetToDto(Pet pet) {
        Breed breed = pet.getBreed();
        Type type = breed.getType();
        BreedDto breedDto = mapBreedToDto(breed);
        TypeDto typeDto = mapTypeToDto(type);

        return new PetDto(
                pet.getId(),
                pet.getName(),
                pet.getAge(),
                pet.getGenre(),
                pet.getDescription(),
                pet.getStatus(),
                pet.getImage(),
                breedDto,
                typeDto
        );
    }

    private BreedDto mapBreedToDto(Breed breed) {
        Type type = breed.getType();
        TypeDto typeDto = mapTypeToDto(type);

        return new BreedDto(
                breed.getId(),
                breed.getName(),
                typeDto
        );
    }

    private TypeDto mapTypeToDto(Type type) {
        return new TypeDto(
                type.getId(),
                type.getName()
        );
    }

    private String saveImage(MultipartFile image) {
        // Generate a random file name
        String fileName = UUID.randomUUID().toString() + "-" + StringUtils.cleanPath(image.getOriginalFilename());

        // Define the target directory and path
        Path targetDirectory = Path.of("src/main/resources/static/images");
        Path targetPath = targetDirectory.resolve(fileName);

        try {
            // Create the target directory if it doesn't exist
            if (!Files.exists(targetDirectory)) {
                Files.createDirectories(targetDirectory);
            }

            // Save the image file to the target path
            Files.copy(image.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void savePet(Pet pet) {
        petRepository.save(pet);
    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }
}