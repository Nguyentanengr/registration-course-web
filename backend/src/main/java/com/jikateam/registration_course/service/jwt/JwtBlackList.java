package com.jikateam.registration_course.service.jwt;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class JwtBlackList {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper redisObjectMapper;

    public Optional<Date> getExpirationTimeById(String identity) {
        Object value = redisTemplate.opsForValue().get(identity);
        Date date = (value instanceof Date) ? (Date) value : null;
        return Optional.ofNullable(date);
    }

    public void cacheItem(String identity, Date expirationTime) {
        long timeToLive = Math.max(0, expirationTime.getTime() - System.currentTimeMillis());
        redisTemplate.opsForValue().set(identity, expirationTime, timeToLive, TimeUnit.MILLISECONDS);
    }

    public void removeById(String identity) {
        redisTemplate.delete(identity);
    }

    public boolean isExist(String identity) {
        return getExpirationTimeById(identity).isPresent();
    }

}
