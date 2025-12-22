package saurav.com.example.backend.dto;

import lombok.Data;

@Data
public class JwtResponse {

    private String jwt;
    private String message;

}