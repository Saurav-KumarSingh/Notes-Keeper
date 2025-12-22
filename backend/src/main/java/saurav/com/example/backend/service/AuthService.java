package saurav.com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import saurav.com.example.backend.dto.JwtResponse;
import saurav.com.example.backend.dto.LoginRequest;
import saurav.com.example.backend.dto.SignupRequest;
import saurav.com.example.backend.entity.Role;
import saurav.com.example.backend.entity.User;
import saurav.com.example.backend.respositories.UserRepository;
import saurav.com.example.backend.security.JwtUtil;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<?> register(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Email is already in use!");
        }

        // 1️⃣ Create user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        // 2️⃣ Authenticate user immediately
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 3️⃣ Generate JWT token
        String token = jwtUtil.generateToken(request.getEmail());

        // 4️⃣ Prepare response
        JwtResponse response = new JwtResponse();
        response.setJwt(token);
        response.setMessage("User registered & logged in successfully");

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    public ResponseEntity<?> login(LoginRequest request) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = (User) authentication.getPrincipal();

            // ✅ GENERATE JWT
            String token = jwtUtil.generateToken(user.getEmail());

            JwtResponse response = new JwtResponse();
            response.setJwt(token);
            response.setMessage("Login successful");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }
}
