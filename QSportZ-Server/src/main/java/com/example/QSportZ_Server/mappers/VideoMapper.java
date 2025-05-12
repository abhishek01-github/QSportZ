package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.Video;
import com.example.QSportZ_Server.models.VideoDTO;
import org.mapstruct.Mapper;

@Mapper
public interface VideoMapper {

    Video videoDtoToVideo(VideoDTO dto);

    VideoDTO videoToVideoDto(Video video);
}
