package saurav.com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import saurav.com.example.backend.dto.ProfileRequest;
import saurav.com.example.backend.dto.ProfileResponse;
import saurav.com.example.backend.entity.User;
import saurav.com.example.backend.respositories.UserRepository;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    // ✅ GET PROFILE
    public ResponseEntity<ProfileResponse> getProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProfileResponse response = ProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .profileImage(user.getProfileImage())
                .build();

        return ResponseEntity.ok(response);
    }

    // ✅ EDIT PROFILE
    public ResponseEntity<ProfileResponse> updateProfile(ProfileRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields
        if (request.getName() != null) {
            user.setName(request.getName());
        }

        userRepository.save(user);

        ProfileResponse response = ProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .profileImage(user.getProfileImage())
                .build();

        return ResponseEntity.ok(response);
    }
}
