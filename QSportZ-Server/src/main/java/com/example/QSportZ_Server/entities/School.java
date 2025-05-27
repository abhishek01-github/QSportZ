package com.example.QSportZ_Server.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "schools")
public class School extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;

    @OneToOne
    @JoinColumn(name = "admin_id")
    private User admin;
}
