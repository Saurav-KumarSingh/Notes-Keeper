package saurav.com.example.backend.service;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import saurav.com.example.backend.dto.NoteRequest;
import saurav.com.example.backend.dto.NoteResponse;
import saurav.com.example.backend.entity.Note;
import saurav.com.example.backend.entity.User;
import saurav.com.example.backend.respositories.NoteRepository;
import saurav.com.example.backend.respositories.UserRepository;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteService(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    // ✅ CREATE NOTE (email from JWT)
    public Note createNote(NoteRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName(); // email from JWT

        System.out.println(email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = new Note();
        note.setContent(request.getContent());
        note.setUser(user);

        return noteRepository.save(note);
    }



//    // ✅ GET LOGGED-IN USER NOTES
public List<NoteResponse> getMyNotes() {
    var email = SecurityContextHolder.getContext().getAuthentication().getName();
    var user = userRepository.findByEmail(email).orElseThrow();
    return noteRepository.findByUser(user)
            .stream()
            .map(n -> new NoteResponse(
                    n.getId(),
                    n.getContent(),
                    n.getCreatedAt()
            ))
            .toList();

}


}
