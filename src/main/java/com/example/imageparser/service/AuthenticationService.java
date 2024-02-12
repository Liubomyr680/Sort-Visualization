package com.example.imageparser.service;

import com.example.imageparser.models.CustomUser;
import com.example.imageparser.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService {
    Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void registerUser(CustomUser user) {
        // Хешування пароля перед збереженням у базу даних
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);

        logger.info("User saved successfully");
    }

    public List<CustomUser> findAll(){
        return userRepository.findAll();
    }

    public CustomUser findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean authenticateUser(String email, String password) {
//         Знайти користувача за електронною адресою
        CustomUser user = userRepository.findByEmail(email);
        if (user != null) {
            // Перевірити, чи співпадають паролі
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }
}
