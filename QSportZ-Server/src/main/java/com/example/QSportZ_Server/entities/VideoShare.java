package com.example.QSportZ_Server.entities;

import jakarta.persistence.*;
import lombok.Data;              // ← add this
import lombok.EqualsAndHashCode;

@Data                           // ← add this
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "video_shares")
public class VideoShare extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    @ManyToOne
    @JoinColumn(name = "shared_with_user_id", nullable = false)
    private User sharedWith;

    @ManyToOne
    @JoinColumn(name = "shared_by_user_id", nullable = false)
    private User sharedBy;
}
