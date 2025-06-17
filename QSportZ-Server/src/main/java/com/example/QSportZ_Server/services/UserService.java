package com.example.QSportZ_Server.services;

import com.example.QSportZ_Server.entities.User;
import com.example.QSportZ_Server.exceptions.ResourceNotFoundException;
import com.example.QSportZ_Server.mappers.UserMapper;
import com.example.QSportZ_Server.models.UserDTO;
import com.example.QSportZ_Server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final S3Client s3Client;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    /**
     * Generate a presigned URL for secure access to private S3 objects.
     */
    public String generatePresignedUrl(String key) {
        // Prepare a standard GetObjectRequest
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        // Wrap it to define expiry
        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .getObjectRequest(getObjectRequest)
                .signatureDuration(Duration.ofMinutes(15))
                .build();

        PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(presignRequest);
        return presignedRequest.url().toString();
    }

    /**
     * Uploads a profile photo and returns its public URL or presigned URL.
     */
    public String uploadProfilePhoto(MultipartFile file, Long userId) throws IOException {
        String key = "profiles/" + userId + "-" + UUID.randomUUID() + "-" + file.getOriginalFilename();
        // Upload bytes to S3
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );
        // Return an expiring URL for download
        return generatePresignedUrl(key);
    }

    public UserDTO updatePhotoUrl(Long userId, String photoUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setProfilePhotoUrl(photoUrl);
        User saved = userRepository.save(user);
        return userMapper.userToUserDto(saved);
    }

    public UserDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::userToUserDto)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public List<UserDTO> listUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::userToUserDto)
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setSpeciality(dto.getSpeciality());
        user.setProfilePhotoUrl(dto.getProfilePhotoUrl());
        return userMapper.userToUserDto(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}