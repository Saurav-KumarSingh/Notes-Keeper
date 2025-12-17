package saurav.com.example.backend.respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import saurav.com.example.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}


