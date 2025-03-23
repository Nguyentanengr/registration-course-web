package com.jikateam.registration_course.service.place;


import com.jikateam.registration_course.converter.PlaceConverter;
import com.jikateam.registration_course.dto.response.PlaceResponse;
import com.jikateam.registration_course.entity.Place;
import com.jikateam.registration_course.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final PlaceConverter placeConverter;

    public List<PlaceResponse> getAllPlaces(String searchKey) {
        List<Place> places = placeRepository.findAllBySearchKey(searchKey);
        return places.stream().map(placeConverter::mapToPlaceResponse).toList();
    }
}
