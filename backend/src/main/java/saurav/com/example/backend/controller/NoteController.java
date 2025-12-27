package saurav.com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import saurav.com.example.backend.dto.NoteRequest;
import saurav.com.example.backend.dto.NoteResponse;
import saurav.com.example.backend.entity.Note;
import saurav.com.example.backend.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public ResponseEntity<?> createNote(
            @RequestBody NoteRequest request) {

        Note note = noteService.createNote(request);
        return ResponseEntity.ok("Note created successfully!");
    }

    @GetMapping
    public ResponseEntity<?> getMyNotes() {

        return ResponseEntity.ok(noteService.getMyNotes());
    }
}

