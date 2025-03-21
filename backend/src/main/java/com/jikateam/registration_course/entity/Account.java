package com.jikateam.registration_course.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "account")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer accountId;

    @Column(nullable = false, length = 12, unique = true)
    private String username;

    @Column(nullable = false, length = 255, unique = true)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne(mappedBy = "account")
    private Student student;

    @OneToOne(mappedBy = "account")
    private Teacher teacher;

    @OneToOne(mappedBy = "account")
    private Manager manager;

    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                ", isActive=" + isActive +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}