package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.result;
import com.quizapp.Quiz.App.Services.resultService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("result")
public class Result {

    @Autowired
    private resultService resultservice;



    @PostMapping("/storeinuser/{email}")
    public ResponseEntity<?> StoreinUser(@PathVariable String email,@RequestBody result data) {

        boolean statusofquery=resultservice.addresulttouser(email,data);
        if(statusofquery){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }
        }

    @GetMapping("/getuserresult/{email}")
    public ResponseEntity<?> getUserResult(@PathVariable String email) {
        List<result> resultt=resultservice.getuserresult(email);
            return new ResponseEntity<>(resultt, HttpStatus.OK);

    }

    @DeleteMapping("/deletebyid/{emailid}")
    public ResponseEntity<?> deletebyid(@PathVariable String emailid ,@RequestBody result data) {
       boolean statue= resultservice.deletebyid(data.getId());
       return new ResponseEntity<>("deleted", HttpStatus.OK);
    }
}
