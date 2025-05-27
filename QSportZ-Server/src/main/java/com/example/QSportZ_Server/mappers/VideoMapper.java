package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.Match;
import com.example.QSportZ_Server.entities.School;
import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.entities.Video;
import com.example.QSportZ_Server.models.VideoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VideoMapper {

    // ───────── DTO ← Entity ──────────────────────────────────────
    @Mapping(source = "uploadedBy.id", target = "uploadedById")
    @Mapping(source = "school.id",     target = "schoolId")
    @Mapping(source = "match.id",      target = "matchId")
    VideoDTO videoToVideoDto(Video video);

    // ───────── Entity ← DTO ──────────────────────────────────────
    @Mapping(source = "uploadedById", target = "uploadedBy.id")
    @Mapping(source = "schoolId",     target = "school.id")
    @Mapping(source = "matchId",      target = "match.id")
    Video videoDtoToVideo(VideoDTO dto);

    // ───────── Helpers for ID ↔ Entity conversion ───────────────

    default User mapUser(Long id) {
        if (id == null) return null;
        User u = new User();
        u.setId(id);
        return u;
    }
    default Long mapUser(User user) {
        return user != null ? user.getId() : null;
    }

    default School mapSchool(Long id) {
        if (id == null) return null;
        School s = new School();
        s.setId(id);
        return s;
    }
    default Long mapSchool(School school) {
        return school != null ? school.getId() : null;
    }

    default Match mapMatch(Long id) {
        if (id == null) return null;
        Match m = new Match();
        m.setId(id);
        return m;
    }
    default Long mapMatch(Match match) {
        return match != null ? match.getId() : null;
    }
}

