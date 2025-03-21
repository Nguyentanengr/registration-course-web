package com.jikateam.registration_course.service.otp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class OTPTokenCache {

    private final RedisTemplate<String, String> cache;


    public Optional<String> getTokenById(String identity) {
         return Optional.ofNullable(cache.opsForValue().get(identity));
    }

    public void cachingToken(String identity, String token, long seconds) {
        cache.opsForValue().set(identity, token, seconds, TimeUnit.SECONDS);
    }

    public void removeById(String identity) {
        cache.delete(identity);
    }

    public Map<String, Object> getAllItem() {
        Map<String, Object> allValues = new HashMap<>();
        try {
            Set<String> keys = cache.keys("*"); // Lấy tất cả keys trong Redis
            if (keys != null) {
                for (String key : keys) {
                    Object value = cache.opsForValue().get(key);
                    allValues.put(key, value);
                }
            }
        } catch (Exception e) {
            log.info("An Error occurred when get all item from redis: " + e.getMessage());
        }
        return allValues;
    }
}
