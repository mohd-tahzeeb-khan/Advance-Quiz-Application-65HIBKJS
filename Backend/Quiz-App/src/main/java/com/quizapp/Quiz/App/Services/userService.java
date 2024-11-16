package com.quizapp.Quiz.App.Services;


import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Repository.userRepo;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userService {

    @Autowired
    private userRepo userrepositoryinstance;


    public Boolean CreateUser(@NotNull user userdata){
        userrepositoryinstance.save(userdata);
        return true;
    }
}
