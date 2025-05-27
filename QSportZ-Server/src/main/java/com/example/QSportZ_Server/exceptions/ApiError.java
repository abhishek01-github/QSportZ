package com.example.QSportZ_Server.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class ApiError {
    private int status;
    private String error;           // e.g. "Bad Request"
    private String message;         // human-friendly
    private LocalDateTime timestamp;
    private List<String> details;   // e.g. field errors or stack trace if dev mode
}
