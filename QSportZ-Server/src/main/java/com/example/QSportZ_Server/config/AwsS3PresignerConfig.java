package com.example.QSportZ_Server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class AwsS3PresignerConfig {

    @Bean
    public S3Presigner s3Presigner(@Value("${aws.accessKey}") String key,
                                   @Value("${aws.secretKey}") String secret,
                                   @Value("${aws.region}") String region) {
        return S3Presigner.builder()
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(key, secret)))
                .region(Region.of(region))
                .build();
    }
}
