package com.lyonelpierce.animaladoption.mappers;

import com.lyonelpierce.animaladoption.dtos.PetDto;
import com.lyonelpierce.animaladoption.dtos.RequestDto;
import com.lyonelpierce.animaladoption.services.PetService;
import org.springframework.stereotype.Component;
import com.lyonelpierce.animaladoption.entities.Request;

@Component
public class RequestMapper {
    private final PetService petService;

    public RequestMapper(PetService petService) {
        this.petService = petService;
    }

    public RequestDto toDto(Request request) {
        RequestDto requestDto = new RequestDto();
        requestDto.setId(request.getId());
        requestDto.setFirstName(request.getFirstName());
        requestDto.setLastName(request.getLastName());
        requestDto.setAddress(request.getAddress());
        requestDto.setCity(request.getCity());
        requestDto.setState(request.getState());
        requestDto.setZipCode(request.getZipCode());
        requestDto.setPhoneNumber(request.getPhoneNumber());
        requestDto.setEmail(request.getEmail());
        requestDto.setAnnualIncome(request.getAnnualIncome());
        requestDto.setHousingType(request.getHousingType());
        requestDto.setDependents(request.getDependents());

        RequestDto.RequestStatus requestStatus = switch (request.getStatus()) {
            case PENDING -> RequestDto.RequestStatus.PENDING;
            case APPROVED -> RequestDto.RequestStatus.APPROVED;
            case REJECTED -> RequestDto.RequestStatus.REJECTED;
        };
        requestDto.setStatus(requestStatus);

        PetDto petDto = petService.mapPetToDto(request.getPet());
        requestDto.setPet(petDto);

        return requestDto;
    }
}
