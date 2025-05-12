package com.example.QSportZ_Server.repositories;

import com.example.QSportZ_Server.entities.VideoShare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoShareRepository extends JpaRepository<VideoShare, Long> {
    List<VideoShare> findBySharedWithId(Long userId);
    List<VideoShare> findByVideoId(Long videoId);
}
