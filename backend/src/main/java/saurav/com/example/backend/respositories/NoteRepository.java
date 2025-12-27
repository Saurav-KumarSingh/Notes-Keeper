package saurav.com.example.backend.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import saurav.com.example.backend.entity.Note;
import saurav.com.example.backend.entity.User;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUser(User user);
}

