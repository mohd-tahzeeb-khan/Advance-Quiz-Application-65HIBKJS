package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface userRepo extends JpaRepository<user, Long> {
    public user findByEmail(String email);
}
