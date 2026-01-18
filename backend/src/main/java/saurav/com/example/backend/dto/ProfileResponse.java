package saurav.com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String profileImage;

}
