package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.answers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface answersRepo extends JpaRepository<answers, Integer> {
}
