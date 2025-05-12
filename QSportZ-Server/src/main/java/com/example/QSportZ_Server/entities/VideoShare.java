package com.example.QSportZ_Server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "video_shares")
public class VideoShare extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne
    @JoinColumn(name = "shared_with_user_id")
    private User sharedWith;
}
