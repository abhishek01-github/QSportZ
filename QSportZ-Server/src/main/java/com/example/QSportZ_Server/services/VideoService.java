package com.example.QSportZ_Server.services;

import com.example.QSportZ_Server.entities.Video;
import com.example.QSportZ_Server.exceptions.ResourceNotFoundException;
import com.example.QSportZ_Server.mappers.VideoMapper;
import com.example.QSportZ_Server.models.VideoDTO;
import com.example.QSportZ_Server.repositories.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoRepository videoRepository;
    private final VideoMapper videoMapper;
    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public VideoDTO uploadVideo(MultipartFile file, VideoDTO metadata) throws IOException {
        String key = "videos/" + UUID.randomUUID() + ".mp4";

        // 1) Upload the bytes
        s3Client.putObject(PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );

        // 2) Build and fetch the URL
        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        String url = s3Client.utilities()
                .getUrl(getUrlRequest)
                .toExternalForm();

        // 3) Save and return
        metadata.setVideoUrl(url);
        Video video = videoMapper.videoDtoToVideo(metadata);
        Video saved = videoRepository.save(video);
        return videoMapper.videoToVideoDto(saved);
    }

    public List<VideoDTO> listVideosBySchool(Long schoolId) {
        return videoRepository.findBySchoolId(schoolId).stream()
                .map(videoMapper::videoToVideoDto)
                .collect(Collectors.toList());
    }

    public VideoDTO getVideo(Long id) {
        return videoRepository.findById(id)
                .map(videoMapper::videoToVideoDto)
                .orElseThrow(() -> new ResourceNotFoundException("Video not found with id: " + id));
    }

    public void deleteVideo(Long id) {
        if (!videoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Video not found with id: " + id);
        }
        videoRepository.deleteById(id);
    }
}