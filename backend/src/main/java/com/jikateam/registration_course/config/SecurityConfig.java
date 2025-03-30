package com.jikateam.registration_course.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jikateam.registration_course.dto.response.DataResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String[] PUBLIC_ENDPOINTS = {
            "/api/v1/auth/register", "/api/v1/auth/register/require-otp",
            "/api/v1/auth/reset-password", "api/v1/auth/login",
            "/api/v1/auth/refresh-token", "api/v1/auth/reset-password/require-otp",
            "/api/v1/auth/logout", "api/v1/auth/hello",
            "/api/v1/sessions", "api/v1/sessions/*",
            "/api/v1/sessions/*/schedules", "/api/v1/places/*",
            "/api/v1/places", "/api/v1/teachers", "api/v1/teachers/*",
            "/api/v1/courses", "/api/v1/courses/*", "/api/v1/phases",
            "/api/v1/phases/*", "/api/v1/classes", "/api/v1/classes/*",
            "/api/v1/open-sessions", "/api/v1/open-sessions/*",
            "/api/v1/schedules"


    };

    @Value("${jwt.secret-key}")
    private String secretKey;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .authorizeHttpRequests(request -> {
                    request.requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                            .anyRequest().authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(auth -> {
                    auth.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder()))
                            .authenticationEntryPoint(((request, response, authException) -> {
                                // Process auth exception in here
                                response.setStatus(401);
                                response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                                DataResponse<?> entityResponse = DataResponse.builder()
                                        .code(401L)
                                        .message("User is concac")
                                        .build();

                                ObjectMapper mapper = new ObjectMapper();

                                response.getWriter().write(mapper.writeValueAsString(entityResponse));
                                response.flushBuffer();
                            }));
                });

        return httpSecurity.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HS512");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }


    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // only the given localhost
        corsConfiguration.addAllowedHeader("*"); // allowed any header
        corsConfiguration.addAllowedMethod("*"); // allowed any method: GET, POST, ...
//        corsConfiguration.setAllowCredentials(true); // to send refresh token into Http-Only (Cookie)

        UrlBasedCorsConfigurationSource urls = new UrlBasedCorsConfigurationSource();
        urls.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(urls);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) throws Exception {

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }
}