package com.quizapp.Quiz.App.Repository;

import com.quizapp.Quiz.App.Entity.result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface resultRepo extends JpaRepository<result,Integer> {
    public result findById(int id);
//    public result getByEmail(String email);
}

