package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.mcq_handler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface mcqRepo extends JpaRepository<mcq_handler, Integer> {
}
