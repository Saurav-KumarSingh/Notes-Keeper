package saurav.com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import saurav.com.example.backend.dto.ProfileRequest;
import saurav.com.example.backend.service.ProfileService;

@RestController
@RequestMapping("/user/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<?> getProfile(){
        return profileService.getProfile();

    }

    @PutMapping
    public  ResponseEntity<?> updateProfile(@RequestBody ProfileRequest profileRequest){
        return profileService.updateProfile(profileRequest);
    }


}
