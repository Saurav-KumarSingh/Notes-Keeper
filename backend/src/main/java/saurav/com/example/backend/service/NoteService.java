package saurav.com.example.backend.service;

import org.springframework.http.ResponseEntity;
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

    // ✅ CREATE NOTE
    public Note createNote(NoteRequest request) {
        try {
            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Note note = new Note();
            note.setContent(request.getContent());
            note.setUser(user);

            return noteRepository.save(note);

        } catch (Exception e) {
            throw new RuntimeException("Error creating note: " + e.getMessage());
        }
    }

    // ✅ GET LOGGED-IN USER NOTES
    public List<NoteResponse> getMyNotes() {
        try {
            String email = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow();

            return noteRepository.findAllByUser(user)
                    .stream()
                    .map(n -> new NoteResponse(
                            n.getId(),
                            n.getContent(),
                            n.getCreatedAt()
                    ))
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Error fetching notes: " + e.getMessage());
        }
    }

    // ✅ DELETE NOTE
    public ResponseEntity<?> deleteMyNote(Long noteId) {
        try {
            String email = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Note note = noteRepository.findByIdAndUser(noteId, user)
                    .orElseThrow(() -> new RuntimeException("Note not found or not yours"));

            noteRepository.delete(note);

            return ResponseEntity.ok("Note deleted successfully!");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ UPDATE NOTE (PATCH)
    // ✅ UPDATE NOTE (PATCH)
    public ResponseEntity<?> updateNote(Long noteId, NoteRequest request) {
        try {
            String email = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Note note = noteRepository.findByIdAndUser(noteId, user)
                    .orElseThrow(() -> new RuntimeException("Note not found or not yours"));

            if (request.getContent() != null) {
                note.setContent(request.getContent());
            }

            Note updatedNote = noteRepository.save(note);

            // ✅ RETURN UPDATED NOTE
            return ResponseEntity.ok(updatedNote);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
