package com.quizapp.Quiz.App.Services;

import com.quizapp.Quiz.App.Entity.mcq_handler;
import com.quizapp.Quiz.App.Entity.questions;
import com.quizapp.Quiz.App.Repository.questionsRepo;
import jakarta.servlet.MultipartConfigElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class questionService {


    @Autowired
    private questionsRepo questionrepoinstence;

    @Autowired
    private mcqService mcqservice;


    @Autowired
    private MultipartConfigElement multipartConfigElement;


    public questions addquestions(int id, questions questions){
        Optional<mcq_handler> mcq_handler=mcqservice.getdatabyid(id);
        if(mcq_handler.isPresent()){
            mcq_handler mcq_handlerOptional=mcq_handler.get();
//            questions.setMcq_handler(mcq_handlerOptional);
            return questionrepoinstence.save(questions);
        }
        throw new RuntimeException("Please Enter the data properly."+id);

    }

    public questions updatequestions(int id, questions questions){
        Optional<mcq_handler> mcq_handler=mcqservice.getdatabyid(id);
        if(mcq_handler.isPresent()){
            mcq_handler mcq_handlerOptional=mcq_handler.get();
//            questions.setMcq_handler(mcq_handlerOptional);
            return questionrepoinstence.save(questions);
        }
        throw new RuntimeException("Please Enter the data properly."+id);

    }
}
