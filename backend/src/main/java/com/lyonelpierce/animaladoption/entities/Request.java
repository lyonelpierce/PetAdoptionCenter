package com.lyonelpierce.animaladoption.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_request")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name="last_name", nullable = false)
    private String lastName;
    @Column(name="address", nullable = false)
    private String address;
    @Column(name="city", nullable = false)
    private String city;
    @Column(name="state", nullable = false)
    private String state;
    @Column(name="zip_code", nullable = false)
    private String zipCode;
    @Column(name="phone_number", nullable = false)
    private String phoneNumber;
    @Column(name="email", nullable = false)
    private String email;
    @Column(name="annual_income", nullable = false)
    private String annualIncome;
    @Column(name="housing_type", nullable = false)
    private String housingType;
    @Column(name="dependents", nullable = false)
    private Integer dependents;
    @Column(name="tax_file", nullable = false)
    private String irsTaxPdf;
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RequestStatus status;
    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    public enum RequestStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}
