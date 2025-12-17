package saurav.com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import saurav.com.example.backend.dto.NoteRequest;
import saurav.com.example.backend.entity.Note;
import saurav.com.example.backend.entity.User;
import saurav.com.example.backend.respositories.NoteRepository;
import saurav.com.example.backend.respositories.UserRepository;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public Note createNote(NoteRequest request) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = new Note();
        note.setContent(request.getContent());
//        note.setUser(user);

        return noteRepository.save(note);
    }

    public List<Note> getUserNotes(Long userId) {
        return noteRepository.findByUserId(userId);
    }
}

