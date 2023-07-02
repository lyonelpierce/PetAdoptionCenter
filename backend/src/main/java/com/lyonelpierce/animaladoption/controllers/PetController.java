package com.lyonelpierce.animaladoption.controllers;

import com.lyonelpierce.animaladoption.dtos.PetDto;
import com.lyonelpierce.animaladoption.entities.Pet;
import com.lyonelpierce.animaladoption.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class PetController {

    private final PetService petService;

    @Autowired
    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping("/pets")
    public ResponseEntity<List<PetDto>> getPetList() {
        List<PetDto> petDTOList = petService.getAllPets();
        return ResponseEntity.ok(petDTOList);
    }

    @PostMapping(value = "/addpet", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> addPet(@RequestParam("image") MultipartFile image, @ModelAttribute @Validated Pet pet, BindingResult bindingResult, ModelMap model) {
        String result = petService.addPet(image, pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/updatestatus/{id}")
    public ResponseEntity<String> updatePetStatus(@PathVariable("id") Long id) {
        boolean success = petService.updatePetStatus(id);
        if (success) {
            return ResponseEntity.ok("Pet status updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletepet/{id}")
    public ResponseEntity<String> deletePet(@PathVariable("id") Long id) {
        boolean success = petService.deletePet(id);
        if (success) {
            return ResponseEntity.ok("Pet deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/editpet/{id}")
    public ResponseEntity<String> editPet(
            @PathVariable("id") Long id,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @ModelAttribute @Validated Pet updatedPet,
            BindingResult bindingResult,
            ModelMap model
    ) {
        boolean success;
        if (image != null && !image.isEmpty()) {
            success = petService.editPet(id, image, updatedPet);
        } else {
            success = petService.editPetWithoutImage(id, updatedPet);
        }

        if (success) {
            return ResponseEntity.ok("Pet updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

