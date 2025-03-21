package com.jikateam.registration_course.service.user;

import com.jikateam.registration_course.dto.response.CodeResponse;
import com.jikateam.registration_course.exception.BusinessException;
import com.jikateam.registration_course.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SingleUserService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException(CodeResponse.ACCOUNT_NON_EXIST));
    }
}
