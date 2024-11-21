package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface courseRepo extends JpaRepository<course, Integer> {


}
