package com.lyonelpierce.animaladoption.repositories;

import com.lyonelpierce.animaladoption.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
}
