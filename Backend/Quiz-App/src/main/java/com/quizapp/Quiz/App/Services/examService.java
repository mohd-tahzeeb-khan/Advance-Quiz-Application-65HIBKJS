package com.quizapp.Quiz.App.Services;

import com.quizapp.Quiz.App.Controller.Result;
import com.quizapp.Quiz.App.Controller.User;
import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Entity.result;
import com.quizapp.Quiz.App.Entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.quizapp.Quiz.App.Repository.examsRepo;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class examService {

    @Autowired
    private examsRepo examsRepo;
    @Autowired
    private userService userservice;

    @Autowired
    private resultService resultservice;



    public boolean createExam( String email, exams examdata){
        if(examdata !=null){
            user currentuser=userservice.Getuser(email);
          List<result> currentuserresult=resultservice.getuserresult(email);
          try {
              System.out.println(currentuser);
          }catch(Exception e){
              System.out.println(e);
          }
            examdata.setDateCreate(LocalDateTime.now());
            examdata.setCreator(email);
            examdata.setUser(currentuser);

            examsRepo.save(examdata);
            return true;

        }
        else{
            return false;
        }
    }
    public exams GetExam(String email){
        user currentuser=userservice.Getuser(email);
        result result=currentuser.getResult();
        return examsRepo.getReferenceById();
    }

}
