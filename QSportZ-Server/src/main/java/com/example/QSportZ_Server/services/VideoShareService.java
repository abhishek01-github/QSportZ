package com.example.QSportZ_Server.services;

import com.example.QSportZ_Server.exceptions.ResourceNotFoundException;
import com.example.QSportZ_Server.mappers.VideoShareMapper;
import com.example.QSportZ_Server.models.VideoShareDTO;
import com.example.QSportZ_Server.repositories.VideoShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoShareService {
    private final VideoShareRepository shareRepository;
    private final VideoShareMapper shareMapper;

    public VideoShareDTO shareVideo(VideoShareDTO dto) {
        return shareMapper.toDto(shareRepository.save(shareMapper.toEntity(dto)));
    }

    public List<VideoShareDTO> listSharesByUser(Long userId) {
        return shareRepository.findBySharedWithId(userId).stream()
                .map(shareMapper::toDto)
                .collect(Collectors.toList());
    }

    public VideoShareDTO getShareById(Long shareId) {
        return shareRepository.findById(shareId)
                .map(shareMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Share not found with id: " + shareId));
    }

    public void unshareVideo(Long shareId) {
        if (!shareRepository.existsById(shareId)) {
            throw new ResourceNotFoundException("Share not found with id: " + shareId);
        }
        shareRepository.deleteById(shareId);
    }
}