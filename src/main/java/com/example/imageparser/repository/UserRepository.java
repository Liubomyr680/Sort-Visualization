package com.example.imageparser.repository;

import com.example.imageparser.models.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<CustomUser, Long> {
    CustomUser findByEmail(String email);
    CustomUser findByUsername(String name);
}
