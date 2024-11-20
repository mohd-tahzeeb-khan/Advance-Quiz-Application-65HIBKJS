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


    public boolean addresulttouser(@NonNull String email,@NonNull result resultdata){
        user currentuser=userserviceinstance.Getuser(email);
        if(currentuser ==null){
            return false;
        }
        else{
            resultdata.setUser(currentuser);
            result data=resultrepoinstance.save(resultdata);
            return true;
        }
//        System.out.println("Quiery answers:"+currentuser);

//        user currentuser=userserviceinstance.Getuser(resultdata.getUser_id().getEmail());
//        currentuser.getResult().add(data);
//        userserviceinstance.Updateuser(currentuser);

    }
    public List<result> getuserresult(String email){
        user currentuser=userserviceinstance.Getuser(email);
        if(currentuser !=null){
            return currentuser.getResult();

        }
        else {
            return null;
        }


    }
    public boolean deletebyid(int data){

        resultrepoinstance.deleteById(data);
        return true;
    }


}
