package com.quizapp.Quiz.App.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/examiner")
public class Examiner {



    @GetMapping("/getexaminer")
    public String getExaminer() {
        return "got it.";
    }
}
