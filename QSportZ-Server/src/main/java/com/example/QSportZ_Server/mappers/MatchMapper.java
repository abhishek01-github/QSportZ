package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.Match;
import com.example.QSportZ_Server.models.MatchDTO;
import org.mapstruct.Mapper;

@Mapper
public interface MatchMapper {

    Match matchDtoToMatch(MatchDTO dto);

    MatchDTO matchToMatchDto(Match match);
}
