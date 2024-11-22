package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.mcq_handler;
import com.quizapp.Quiz.App.Entity.questions;
import com.quizapp.Quiz.App.Services.answersService;
import com.quizapp.Quiz.App.Services.mcqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("test")
public class Test {

    @Autowired
    private mcqService mcqservice;

    @Autowired
    private answersService answersservice;

    @GetMapping("/gettest/{id}")
    public ResponseEntity<?> getTestId(@PathVariable int id) {
        Optional<mcq_handler> getquestion=mcqservice.getdatabyid(id);
        mcq_handler mcq_Handler=getquestion.get();
//        questions Questions=new questions();
//        Questions.setId(mcq_Handler.getId());
//        Questions.setQuestion(mcq_Handler.getQuestions().toString());
        return new ResponseEntity(mcq_Handler, HttpStatus.OK);
    }
    @GetMapping("/getall")
    public ResponseEntity<?> getAll() {

        return new ResponseEntity(answersservice.getall(), HttpStatus.OK);
    }

}
