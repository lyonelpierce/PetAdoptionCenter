package com.lyonelpierce.animaladoption.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
    private String email;
    private String annualIncome;
    private String housingType;
    private Integer dependents;
    private String irsTaxPdf;
    private RequestStatus status;
    private PetDto pet;
    public enum RequestStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}
