package com.example.QSportZ_Server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "videos")
public class Video extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;
}
