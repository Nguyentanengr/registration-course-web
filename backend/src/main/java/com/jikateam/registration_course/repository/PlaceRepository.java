package com.jikateam.registration_course.repository;

import com.jikateam.registration_course.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, String> {

    @Query("SELECT p FROM Place p WHERE " +
            ":searchKey IS NULL OR p.placeId LIKE %:searchKey% OR " +
            "p.placeName LIKE %:searchKey% " +
            "ORDER BY p.placeId ASC")
    List<Place> findAllBySearchKey(@Param("searchKey") String searchKey);
}

