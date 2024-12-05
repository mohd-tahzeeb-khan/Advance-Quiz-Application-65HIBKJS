package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.result;
import com.quizapp.Quiz.App.Services.resultService;
import lombok.NonNull;
import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("result")
public class Result {

    @Autowired
    private resultService resultservice;



    @PostMapping("/ResultCheck")
    public float resultcheck(@RequestBody Map<String, Object> payload) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        Object payloadArray = payload.get("mcq");
        ArrayList<String> answers=new ArrayList<String>();

        System.out.println(payloadArray);

        if (payloadArray instanceof List<?>) {
            // Safely cast to a List
            List<?> mcqList = (List<?>) payloadArray;

            // Convert List to Array (if needed, e.g., for processing)
            Object[] mcqArray = mcqList.toArray();

            // Iterate through the array
            for (Object item : mcqArray) {
                if (item instanceof Map<?, ?>) {
                    // Cast each item to a Map<String, Object> if it is a Map
                    Map<String, Object> mcqItem = (Map<String, Object>) item;

                    // Process each MCQ item here
                    // Example: Extract answers, options, etc.
                    System.out.println(mcqItem.get("answer"));
                    Object objs=mcqItem.get("answer");
                    answers.add(objs.toString());
                    System.out.println(answers);

                }
            }
    return 0;
            // Return the result or do further processing as required
        }
        return 0;
    }


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
