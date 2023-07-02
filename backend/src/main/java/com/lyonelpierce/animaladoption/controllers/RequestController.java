package com.lyonelpierce.animaladoption.controllers;

import com.lyonelpierce.animaladoption.dtos.RequestDto;
import com.lyonelpierce.animaladoption.entities.Pet;
import com.lyonelpierce.animaladoption.entities.Request;
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
import com.lyonelpierce.animaladoption.dtos.RequestDto.RequestStatus;

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

    @PostMapping(value = "/requests", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> addRequest(
            @RequestParam("file") MultipartFile file,
            @ModelAttribute @Validated RequestDto requestDto, BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }

        Request request = convertRequestDtoToEntity(requestDto);

        String result = requestService.addRequest(file, request);

        if (result != null) {
            // Send email
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("lyonel@live.com");
            mailMessage.setTo(request.getEmail());
            mailMessage.setSubject("Adoption Application Confirmation");
            mailMessage.setText("Thank you for submitting your application, we will review it as soon as possible and get in contact with you about your application status.");

            mailSender.send(mailMessage);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
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
        request.setIrsTaxPdf(requestDto.getIrsTaxPdf());
        request.setStatus(Request.RequestStatus.valueOf(requestDto.getStatus().name()));

        Pet pet = new Pet();
        pet.setId(requestDto.getPet().getId());
        pet.setName(requestDto.getPet().getName());
        pet.setAge(requestDto.getPet().getAge());
        pet.setStatus(requestDto.getPet().getStatus());

        request.setPet(pet);

        return request;
    }
}