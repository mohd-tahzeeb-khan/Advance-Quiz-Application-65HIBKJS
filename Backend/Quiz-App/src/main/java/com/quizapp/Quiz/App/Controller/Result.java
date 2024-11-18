package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.result;
import com.quizapp.Quiz.App.Services.resultService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("result")
public class Result {

    @Autowired
    private resultService resultservice;

    @PostMapping("/storeinuser")
    public ResponseEntity<?> StoreinUser(@NonNull result data) {
        resultservice.addresulttouser(data);
        return new ResponseEntity<>("Done", HttpStatus.CREATED);
    }
}
