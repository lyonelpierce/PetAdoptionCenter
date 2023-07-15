package com.lyonelpierce.animaladoption.controllers;

import com.lyonelpierce.animaladoption.dtos.BreedDto;
import com.lyonelpierce.animaladoption.dtos.PetDto;
import com.lyonelpierce.animaladoption.dtos.RequestDto;
import com.lyonelpierce.animaladoption.dtos.TypeDto;
import com.lyonelpierce.animaladoption.entities.Breed;
import com.lyonelpierce.animaladoption.entities.Pet;
import com.lyonelpierce.animaladoption.entities.Request;
import com.lyonelpierce.animaladoption.entities.Type;
import com.lyonelpierce.animaladoption.services.PetService;
import com.lyonelpierce.animaladoption.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


@RestController
public class RequestController {
    private final JavaMailSender mailSender;
    private final RequestService requestService;
    private final PetService petService;


    @Autowired
    public RequestController(RequestService requestService, PetService petService, JavaMailSender mailSender) {
        this.requestService = requestService;
        this.petService = petService;
        this.mailSender = mailSender;
    }

    @GetMapping("/requests")
    public List<RequestDto> getAllRequests() {
        return requestService.getAllRequests();
    }

    @PostMapping("/requests")
    public ResponseEntity<String> addRequest(@Validated RequestDto requestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Validation error");
        }

        Long petId = requestDto.getPet().getId();
        Optional<Pet> optionalPet = petService.getPetById(petId);
        if (optionalPet.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found");
        }

        Pet pet = optionalPet.get();
        requestDto.setPet(convertPetToPetDto(pet));

        Request request = convertRequestDtoToEntity(requestDto);

        requestService.saveRequest(request);

        // Send email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("lyonel@live.com");
        mailMessage.setTo(request.getEmail());
        mailMessage.setSubject("Application Received");
        mailMessage.setText("Thank you for your application. We have received it and will process it shortly.");

        mailSender.send(mailMessage);

        return ResponseEntity.ok("Request added successfully");
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<String> toggleApproveRequest(@PathVariable Long id) {
        Optional<Request> optionalRequest = requestService.getRequestById(id);
        if (optionalRequest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Request request = optionalRequest.get();
        Request.RequestStatus previousStatus = request.getStatus();
        request.setStatus(Request.RequestStatus.APPROVED);
        requestService.saveRequest(request);

        Pet pet = request.getPet();
        pet.setStatus(false);
        petService.savePet(pet);

        if (request.getStatus() == Request.RequestStatus.APPROVED && previousStatus != Request.RequestStatus.APPROVED) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("lyonel@live.com");
            mailMessage.setTo(request.getEmail());
            mailMessage.setSubject("Adoption Application Status");
            mailMessage.setText("Congratulations, your application has been approved! We will contact you in the next few days to schedule a time to pick up your new pet.");

            mailSender.send(mailMessage);
        }

        return ResponseEntity.ok("Status updated successfully");
    }
    @PutMapping("/reject/{id}")
    public ResponseEntity<String> toggleRejectRequest(@PathVariable Long id) {
        Optional<Request> optionalRequest = requestService.getRequestById(id);
        if (optionalRequest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Request request = optionalRequest.get();
        Request.RequestStatus previousStatus = request.getStatus();
        request.setStatus(Request.RequestStatus.REJECTED);
        requestService.saveRequest(request);

        if (request.getStatus() == Request.RequestStatus.REJECTED && previousStatus != Request.RequestStatus.REJECTED) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("lyonel@live.com");
            mailMessage.setTo(request.getEmail());
            mailMessage.setSubject("Adoption Application Rejected");
            mailMessage.setText("As we work to give our beloved pets great conditions we are sorry to communicate you that your application have been rejected. However, this decision can change if you submit a new application with additional information about your income.");

            mailSender.send(mailMessage);
        }

        return ResponseEntity.ok("Status updated successfully");
    }

    private PetDto convertPetToPetDto(Pet pet) {
        PetDto petDto = new PetDto();
        petDto.setId(pet.getId());
        petDto.setName(pet.getName());
        petDto.setAge(pet.getAge());
        petDto.setGenre(pet.getGenre());
        petDto.setDescription(pet.getDescription());
        petDto.setStatus(pet.getStatus());
        petDto.setImage(pet.getImage());
        petDto.setBreed(convertBreedToBreedDto(pet.getBreed()));
        petDto.setType(convertTypeToTypeDto(pet.getType()));
        return petDto;
    }

    private BreedDto convertBreedToBreedDto(Breed breed) {
        BreedDto breedDto = new BreedDto();
        breedDto.setId(breed.getId());

        return breedDto;
    }

    private TypeDto convertTypeToTypeDto(Type type) {
        TypeDto typeDto = new TypeDto();
        typeDto.setId(type.getId());

        return typeDto;
    }

    private Request convertRequestDtoToEntity(RequestDto requestDto) {
        Request request = new Request();
        request.setId(requestDto.getId());
        request.setFirstName(requestDto.getFirstName());
        request.setLastName(requestDto.getLastName());
        request.setAddress(requestDto.getAddress());
        request.setCity(requestDto.getCity());
        request.setState(requestDto.getState());
        request.setZipCode(requestDto.getZipCode());
        request.setPhoneNumber(requestDto.getPhoneNumber());
        request.setEmail(requestDto.getEmail());
        request.setAnnualIncome(requestDto.getAnnualIncome());
        request.setHousingType(requestDto.getHousingType());
        request.setDependents(requestDto.getDependents());
        request.setStatus(Request.RequestStatus.PENDING);

        PetDto petDto = requestDto.getPet();
        Pet pet = new Pet();
        pet.setId(petDto.getId());
        request.setPet(pet);

        return request;
    }
}