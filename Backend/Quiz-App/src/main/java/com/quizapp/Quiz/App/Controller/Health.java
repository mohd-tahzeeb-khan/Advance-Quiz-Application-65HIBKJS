package com.quizapp.Quiz.App.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("health")
public class Health {

    @GetMapping
    public String health() {
        return "health is ok";
    }
}
