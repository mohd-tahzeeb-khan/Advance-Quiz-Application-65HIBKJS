package com.quizapp.Quiz.App.Services;


import com.quizapp.Quiz.App.Entity.answers;
import com.quizapp.Quiz.App.Repository.answersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class answersService {

    @Autowired
    private answersRepo answersrepoinstance;

    public List<?> getall(){
        return answersrepoinstance.findAll();
    }
    public answers storeintodatabase(answers answer){
        return answersrepoinstance.save(answer);
    }
}
