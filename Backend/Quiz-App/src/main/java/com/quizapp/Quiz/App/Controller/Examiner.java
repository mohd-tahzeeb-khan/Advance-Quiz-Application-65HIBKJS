package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.examiner;
import com.quizapp.Quiz.App.Services.examinerService;
import com.quizapp.Quiz.App.Services.getloginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/examiner")
public class Examiner {

    @Autowired
    private examinerService examinerservice;

    @Autowired
    private getloginService getloginservice;

    @GetMapping("/getexaminer")
    public ResponseEntity<examiner> getExaminer() {
        System.out.println("hello");
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        System.out.println(email);
        examiner examiner=examinerservice.getExaminer(email);
//        System.out.println(examiner);
        if(examiner==null) {
            return null;
        }else{
            return new ResponseEntity<>(examiner, HttpStatus.OK);
        }
    }
}
