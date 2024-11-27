package com.quizapp.Quiz.App.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class getloginService {

    @Autowired
    private userService userservice;
    public boolean getAuth(String email) {
        if(userservice.isExist(email)){
            return true;
        }
        else{
            return false;
        }
    }
}
