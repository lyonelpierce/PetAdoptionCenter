package com.lyonelpierce.animaladoption.controllers;

import com.lyonelpierce.animaladoption.dtos.TypeDto;
import com.lyonelpierce.animaladoption.entities.Type;
import com.lyonelpierce.animaladoption.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

//    LIST OF TYPES
    @GetMapping("/types")
    public List<TypeDto> getTypes() {
        return typeService.getAllTypes();
    }

//    LIST OF TYPES WITHOUT BREEDS
    @GetMapping("/typeswithoutbreeds")
    public List<TypeDto> getTypesWithoutBreeds() {
        return typeService.getAllTypesWithoutBreeds();
    }

//    ADD TYPE
    @PostMapping("/addtype")
    public ResponseEntity<String> addType(@RequestBody String typeName) {
        boolean success = typeService.addType(typeName);
        if (success) {
            return ResponseEntity.ok("Type added successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to add type");
        }
    }

//    EDIT TYPE
    @PostMapping("/edittype/{id}")
    public ResponseEntity<String> editType(@PathVariable Long id, @RequestBody String typeName) {
        boolean success = typeService.editType(id, typeName);
        if (success) {
            return ResponseEntity.ok("Type edited successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to edit type");
        }
    }

//    DELETE TYPE
    @DeleteMapping("/deletetype/{id}")
    public ResponseEntity<String> deleteType(@PathVariable Long id) {
        boolean success = typeService.deleteType(id);
        if (success) {
            return ResponseEntity.ok("Type deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete type");
        }
    }
}
