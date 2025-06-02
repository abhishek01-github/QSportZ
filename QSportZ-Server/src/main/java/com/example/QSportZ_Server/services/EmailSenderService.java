package com.example.QSportZ_Server.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final JavaMailSender mailSender;

    public void send(String to, String subject, String body) {
        MimeMessage msg = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(msg, "utf-8");
            helper.setFrom("abhishekpandey118852@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);  // true = HTML
            // optionally setFrom(helper.setFrom(...));
            mailSender.send(msg);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}