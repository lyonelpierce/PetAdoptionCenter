package com.lyonelpierce.animaladoption.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;

@RestController
public class FileController {
    @GetMapping("/files/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        // Construct the image file path
        Path filePath = Path.of("src/main/resources/static/files/" + fileName);

        try {
            // Create a resource object from the image file path
            Resource fileResource = new UrlResource(filePath.toUri());

            // Check if the resource exists
            if (fileResource.exists()) {
                // Return the resource as a response
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF) // Set the appropriate content type
                        .body(fileResource);
            } else {
                // Return a not found response if the image does not exist
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            // Handle the exception appropriately
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
