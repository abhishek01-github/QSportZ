package com.example.QSportZ_Server.repositories;

import com.example.QSportZ_Server.entities.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findBySchoolAIdOrSchoolBId(Long schoolAId, Long schoolBId);
}
