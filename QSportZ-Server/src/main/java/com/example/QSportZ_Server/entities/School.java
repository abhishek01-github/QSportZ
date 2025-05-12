package com.example.QSportZ_Server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "schools")
public class School {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;

    @OneToOne
    @JoinColumn(name = "admin_id")
    private User admin;
}
