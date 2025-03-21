package com.jikateam.registration_course.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class RedisConfig {

    @Value("${redis.cache.key}")
    private String redisKey;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {

        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName("jika-redis.redis.cache.windows.net");
        config.setPort(6380);
        config.setPassword(redisKey);

        // Bật SSL
        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .useSsl() // Kích hoạt SSL
                .disablePeerVerification() // Tùy chọn: Bỏ qua kiểm tra chứng chỉ (không khuyến khích trong production)
                .build();

        LettuceConnectionFactory factory = new LettuceConnectionFactory(config, clientConfig);
        factory.afterPropertiesSet();
        return factory;
    }

    @Bean
    RedisTemplate<String, Object> redisTemplate(LettuceConnectionFactory redisConnection) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnection);
        return template;
    }

}
