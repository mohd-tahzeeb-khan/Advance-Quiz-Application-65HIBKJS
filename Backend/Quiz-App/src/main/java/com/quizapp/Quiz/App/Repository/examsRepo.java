package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.exams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface examsRepo extends JpaRepository<exams, Integer> {
    //public exams findByEmail(String Email);
}