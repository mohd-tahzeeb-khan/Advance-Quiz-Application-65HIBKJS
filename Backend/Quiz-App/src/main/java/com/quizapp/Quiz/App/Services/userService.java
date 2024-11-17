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
    public user Getuser(@NotNull String email) {
        user getuser;
        getuser = userrepositoryinstance.findByEmail(email);
        if(getuser == null) {
            return null;
        } else{
            return getuser;
        }
    }
    public void Updateuser(@NotNull user userdata){
        userrepositoryinstance.save(userdata);
    }

    public boolean Deleteuser(@NotNull String email){
        System.out.println(email);
        user gettinguser= userrepositoryinstance.findByEmail(email);
//        System.out.println(gettinguser);
        if(gettinguser != null) {
            userrepositoryinstance.delete(gettinguser);
            return true;
        }else{

            return false;

        }
    }
}
