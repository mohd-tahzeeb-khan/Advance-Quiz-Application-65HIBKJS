package com.quizapp.Quiz.App.Services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;
public class examService {



    @Autowired
    examService examservice;
    @Test
    public void test() {
        int idd=33;
        assertNotNull(examservice.getExam(idd));
    }
}
