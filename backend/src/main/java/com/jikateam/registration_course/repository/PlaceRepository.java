package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<Place, String> {
}

