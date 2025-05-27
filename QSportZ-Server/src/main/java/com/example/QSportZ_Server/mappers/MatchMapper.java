package com.example.QSportZ_Server.mappers;

import com.example.QSportZ_Server.entities.Match;
import com.example.QSportZ_Server.entities.School;
import com.example.QSportZ_Server.enums.MatchResult;
import com.example.QSportZ_Server.models.MatchDTO;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MatchMapper {

    // ─── DTO → Entity ────────────────────────────────────────────
    @Mapping(source = "schoolOneId", target = "schoolA.id")
    @Mapping(source = "schoolTwoId", target = "schoolB.id")
    // skip winner here; we'll set it in @AfterMapping
    @Mapping(target = "winner", ignore = true)
    Match matchDtoToMatch(MatchDTO dto);

    // ─── Entity → DTO ────────────────────────────────────────────
    @Mapping(source = "schoolA.id", target = "schoolOneId")
    @Mapping(source = "schoolB.id", target = "schoolTwoId")
    // skip winnerSchoolName here; we'll set it in @AfterMapping
    @Mapping(target = "winnerSchoolName", ignore = true)
    MatchDTO matchToMatchDto(Match match);

    // ─── AfterMapping hooks ───────────────────────────────────────
    @AfterMapping
    default void setWinnerEnum(MatchDTO dto, @MappingTarget Match match) {
        // Only called on DTO→Entity conversions
        String name = dto.getWinnerSchoolName();
        if ("Draw".equalsIgnoreCase(name)) {
            match.setWinner(MatchResult.DRAW);
        } else if (name != null && name.equals(match.getSchoolA().getName())) {
            match.setWinner(MatchResult.SCHOOL_A);
        } else if (name != null && name.equals(match.getSchoolB().getName())) {
            match.setWinner(MatchResult.SCHOOL_B);
        }
    }

    @AfterMapping
    default void setWinnerName(Match match, @MappingTarget MatchDTO dto) {
        // Only called on Entity→DTO conversions
        MatchResult res = match.getWinner();
        if (res == null || res == MatchResult.DRAW) {
            dto.setWinnerSchoolName("Draw");
        } else if (res == MatchResult.SCHOOL_A) {
            dto.setWinnerSchoolName(match.getSchoolA().getName());
        } else {
            dto.setWinnerSchoolName(match.getSchoolB().getName());
        }
    }

    // ─── Helper for School ID ↔ School object ────────────────────
    default School mapSchool(Long id) {
        if (id == null) return null;
        School s = new School();
        s.setId(id);
        return s;
    }
}