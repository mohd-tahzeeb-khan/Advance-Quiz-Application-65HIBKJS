package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.examiner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface examinerRepo extends JpaRepository<examiner, Long> {
    public examiner findByEmail(String email);
}
