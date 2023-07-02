package com.lyonelpierce.animaladoption.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;

import java.net.MalformedURLException;
import java.nio.file.Path;

@RestController
public class ImageController {

    @GetMapping("/images/{imageName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        // Construct the image file path
        Path imagePath = Path.of("src/main/resources/static/images/" + imageName);

        try {
            // Create a resource object from the image file path
            Resource imageResource = new UrlResource(imagePath.toUri());

            // Check if the resource exists
            if (imageResource.exists()) {
                // Return the resource as a response
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Set the appropriate content type
                        .body(imageResource);
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