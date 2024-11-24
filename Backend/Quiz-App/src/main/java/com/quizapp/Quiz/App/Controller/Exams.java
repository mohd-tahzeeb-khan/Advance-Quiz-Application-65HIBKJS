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

    @PostMapping("/create/{id}/{email}")
    public ResponseEntity<?> create(@PathVariable int id, @PathVariable String email, @RequestBody exams examdata) {
        exams currentsave=examservice.createExam(id, email, examdata);
        if(currentsave!=null){
            return new ResponseEntity<>(currentsave, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

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
  @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        if(examservice.deleteExam(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
        }



  }

}
