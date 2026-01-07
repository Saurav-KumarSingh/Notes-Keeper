package saurav.com.example.backend.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import saurav.com.example.backend.entity.Note;
import saurav.com.example.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findByUser(User user);

    Optional<Note> findByIdAndUser(Long id, User user);

    List<Note> findAllByUser(User user);

}

