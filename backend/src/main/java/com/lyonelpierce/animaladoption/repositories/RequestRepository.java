package com.lyonelpierce.animaladoption.repositories;

import com.lyonelpierce.animaladoption.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
}