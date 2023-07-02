package com.lyonelpierce.animaladoption.repositories;

import com.lyonelpierce.animaladoption.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface TypeRepository extends JpaRepository<Type, Long> {

}
