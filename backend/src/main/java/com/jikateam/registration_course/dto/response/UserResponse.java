package com.jikateam.registration_course.dto.response;

import com.jikateam.registration_course.entity.Account;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record UserResponse(

        Integer userId,
        String username,
        LocalDateTime createdAt,
        Boolean isActive,
        String role
)
{
    public static UserResponse fromEntity(Account account) {
        return UserResponse.builder()
                .userId(account.getAccountId())
                .username(account.getUsername())
                .createdAt(account.getCreatedAt())
                .isActive(account.getIsActive())
                .role(account.getRole().getRoleName())
                .build();
    }
}