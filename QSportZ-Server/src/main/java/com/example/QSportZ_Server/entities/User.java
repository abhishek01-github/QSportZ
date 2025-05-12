package com.example.QSportZ_Server.entities;

import com.example.QSportZ_Server.enums.Role;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String phoneNumber;
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Role role; // enum Role { ADMIN, COACH, ATHLETE, TEAM_ADMIN }

    private String speciality;
    private String profilePhotoUrl;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;
}

