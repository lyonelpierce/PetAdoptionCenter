package com.lyonelpierce.animaladoption.controllers;

import com.lyonelpierce.animaladoption.dtos.BreedDto;
import com.lyonelpierce.animaladoption.dtos.TypeDto;
import com.lyonelpierce.animaladoption.services.BreedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BreedController {
    private final BreedService breedService;

    @Autowired
    public BreedController(BreedService breedService) {
        this.breedService = breedService;
    }

//    BREEDS LIST
    @GetMapping("/breeds")
    public List<BreedDto> getBreeds() {
        return breedService.getAllBreeds();
    }

//    DROPDOWN LIST OF BREEDS
    @GetMapping("/breeds/{typeId}")
    public ResponseEntity<List<BreedDto>> getBreedsByType(@PathVariable Long typeId) {
        List<BreedDto> breeds = breedService.getBreedsByTypeId(typeId);
        return ResponseEntity.ok(breeds);
    }

//    ADD BREED
    @PostMapping("/addbreed")
    public ResponseEntity<BreedDto> addBreed(@RequestBody BreedDto breedDto) {
        BreedDto savedBreed = breedService.addBreed(breedDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBreed);
    }

//    EDIT BREED
    @PostMapping("/editbreed/{id}")
    public ResponseEntity<BreedDto> editBreed(@PathVariable Long id, @RequestBody BreedDto breedDto) {
        BreedDto updatedBreed = breedService.editBreed(id, breedDto);
        return ResponseEntity.ok(updatedBreed);
    }

//    DELETE BREED
    @DeleteMapping("/deletebreed/{id}")
    public ResponseEntity<String> deleteBreed(@PathVariable Long id) {
        breedService.deleteBreed(id);
        return ResponseEntity.ok("Breed deleted successfully");
    }
}