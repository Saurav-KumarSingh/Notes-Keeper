package saurav.com.example.backend.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import saurav.com.example.backend.entity.Note;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(Long userId);
}

