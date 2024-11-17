package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Repository.userRepo;
import com.quizapp.Quiz.App.Services.userService;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class User {

    @Autowired
    private userService userservice;



@PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody user user) {
    if(user!=null) {
        userservice.CreateUser(user);
        return new ResponseEntity<>("Create", HttpStatus.CREATED);
    }
    else{
        return new ResponseEntity<>("Error", HttpStatus.CONFLICT);
        }
} //Function end -->Create

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody user user) {
    if(user!=null) {
        user Getuser=userservice.Getuser(user.getEmail());
        if(Getuser!=null) {
            userservice.Updateuser(user);
            return new ResponseEntity<>("Update", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Error", HttpStatus.CONFLICT);
        }
    }
    else {
        return new ResponseEntity<>("Error", HttpStatus.CONFLICT);
    }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody String email) {
    if(email!=null) {
        System.out.println(email);
        boolean respose=userservice.Deleteuser(email);
        if(respose) {
            return new ResponseEntity<>("Delete", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
        }

    }else{
        return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
    }
    }
}
