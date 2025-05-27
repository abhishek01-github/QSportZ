package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.entities.Video;
import com.example.QSportZ_Server.entities.VideoShare;
import com.example.QSportZ_Server.models.VideoShareDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface VideoShareMapper {

    // ─── Entity → DTO ────────────────────────────────────────────
    @Mapping(source = "video.id",        target = "videoId")
    @Mapping(source = "sharedWith.id",   target = "sharedWithUserId")
    @Mapping(source = "sharedBy.id",     target = "sharedByUserId")
    VideoShareDTO toDto(VideoShare entity);

    // ─── DTO → Entity ────────────────────────────────────────────
    @Mapping(source = "videoId",          target = "video",        qualifiedByName = "videoFromId")
    @Mapping(source = "sharedWithUserId", target = "sharedWith",   qualifiedByName = "userFromId")
    @Mapping(source = "sharedByUserId",   target = "sharedBy",     qualifiedByName = "userFromId")
    VideoShare toEntity(VideoShareDTO dto);

    // ─── Name-qualified helpers ───────────────────────────────────
    @Named("videoFromId")
    default Video videoFromId(Long id) {
        if (id == null) return null;
        Video v = new Video();
        v.setId(id);
        return v;
    }

    @Named("userFromId")
    default User userFromId(Long id) {
        if (id == null) return null;
        User u = new User();
        u.setId(id);
        return u;
    }
}
