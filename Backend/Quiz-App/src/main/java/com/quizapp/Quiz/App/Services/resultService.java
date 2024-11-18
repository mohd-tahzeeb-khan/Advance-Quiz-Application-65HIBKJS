package com.quizapp.Quiz.App.Services;


import com.quizapp.Quiz.App.Entity.result;
import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Repository.resultRepo;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class resultService {

    @Autowired
    private resultRepo resultrepoinstance;

    @Autowired
    private userService userserviceinstance;


    public void addresulttouser(@NonNull result resultdata){
        result data=resultrepoinstance.save(resultdata);
        user currentuser=userserviceinstance.Getuser(resultdata.getUserEmail());
        currentuser.getResult().add(data);
        userserviceinstance.Updateuser(currentuser);

    }
}
