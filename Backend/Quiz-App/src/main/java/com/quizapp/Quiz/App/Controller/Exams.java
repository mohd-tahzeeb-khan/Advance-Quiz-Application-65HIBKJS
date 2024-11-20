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
    public ResponseEntity<String> create(@PathVariable String email, @RequestBody exams examdata) {
        boolean status=examservice.createExam(email, examdata);
        return new ResponseEntity<>("created", HttpStatus.CREATED);
    }
    @GetMapping("/getexams/{email}")
    public ResponseEntity<exams> getexams(@PathVariable String email) {
        exams exam=examservice.GetExam(email);
        return new ResponseEntity<>(exam, HttpStatus.OK);
    }
}
