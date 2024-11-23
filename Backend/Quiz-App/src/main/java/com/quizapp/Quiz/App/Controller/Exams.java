package com.quizapp.Quiz.App.Controller;

import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Services.examService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("exam")
public class Exams {

    @Autowired
    private examService examservice;

    @PostMapping("/create/{email}")
    public ResponseEntity<?> create(@PathVariable String email, @RequestBody exams examdata) {
        exams currentsave=examservice.createExam(email, examdata);
        return new ResponseEntity<>(currentsave, HttpStatus.CREATED);
    }
    @GetMapping("/getexams/{id}")
    public ResponseEntity<?> getexams(@PathVariable int id) {
        exams exam=examservice.getExam(id);
        if(exam!=null){
            return new ResponseEntity<>(exam, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
        }

  }
}
