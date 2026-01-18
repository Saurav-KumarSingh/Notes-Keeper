package saurav.com.example.backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import saurav.com.example.backend.dto.LoginRequest;
import saurav.com.example.backend.dto.SignupRequest;
import saurav.com.example.backend.service.AuthService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ REGISTER (Default Role = USER)
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest request) {
        return authService.register(request);
    }

    // ✅ LOGIN (Returns JWT)
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }



}
