package com.example.QSportZ_Server.entities;

import com.example.QSportZ_Server.enums.MatchResult;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "matches")
public class Match extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "school_a_id")
    private School schoolA;

    @ManyToOne
    @JoinColumn(name = "school_b_id")
    private School schoolB;

    @Enumerated(EnumType.STRING)
    private MatchResult winner; // enum MatchResult { SCHOOL_A, SCHOOL_B, DRAW }

    private LocalDate matchDate;
    private String description;
}
