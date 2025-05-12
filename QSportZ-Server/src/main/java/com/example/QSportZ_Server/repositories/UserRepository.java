package com.example.QSportZ_Server.repositories;

import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
    List<User> findBySchoolId(Long schoolId);
}
