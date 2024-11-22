package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface questionsRepo extends JpaRepository<questions, Integer> {
    public questions getById(int id);
}
