package com.lyonelpierce.animaladoption.services;

import com.lyonelpierce.animaladoption.dtos.RequestDto;
import com.lyonelpierce.animaladoption.entities.Request;
import com.lyonelpierce.animaladoption.mappers.RequestMapper;
import com.lyonelpierce.animaladoption.repositories.RequestRepository;
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
public class RequestService {

    private final RequestRepository requestRepository;

    private final RequestMapper requestMapper;

    @Autowired
    public RequestService(RequestRepository requestRepository, RequestMapper requestMapper, PetService petService) {
        this.requestRepository = requestRepository;
        this.requestMapper = requestMapper;
    }

    public String addRequest(Request request) {
        requestRepository.save(request);
        return "Pet added successfully";
    }

    public List<RequestDto> getAllRequests() {
        List<Request> requests = requestRepository.findAll();
        return requests.stream()
                .map(requestMapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public void saveRequest(Request request) {
        requestRepository.save(request);
    }

}

