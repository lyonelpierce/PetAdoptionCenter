package com.lyonelpierce.animaladoption.repositories;

import com.lyonelpierce.animaladoption.entities.Breed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreedRepository extends JpaRepository<Breed, Long> {
    @Query("SELECT b FROM Breed b WHERE b.type.id = :typeId")
    List<Breed> findByTypeId(@Param("typeId") Long typeId);

    boolean existsByTypeId(Long typeId);

}
