package com.example.QSportZ_Server.entities;

import com.example.QSportZ_Server.enums.MatchResult;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data                           // ← add this
@EqualsAndHashCode(callSuper = true)
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
    private MatchResult winner;

    private LocalDate matchDate;

    @Column(length = 20)
    private String score;
}
