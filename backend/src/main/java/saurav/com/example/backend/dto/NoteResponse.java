package saurav.com.example.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoteResponse {
    private Long id;
    private String content;
    private LocalDateTime createdAt;


}

