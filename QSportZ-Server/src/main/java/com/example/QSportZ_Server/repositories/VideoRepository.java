package com.example.QSportZ_Server.repositories;

import com.example.QSportZ_Server.entities.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByUploadedById(Long userId);
    List<Video> findBySchoolId(Long schoolId);
    List<Video> findByMatchId(Long matchId);
}
