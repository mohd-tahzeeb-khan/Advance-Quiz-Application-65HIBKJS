package com.quizapp.Quiz.App.Controller;

import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Services.examService;
import com.quizapp.Quiz.App.Services.getloginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("exam")
public class Exams {

    @Autowired
    private examService examservice;

    @Autowired
    private getloginService getloginservice;

    //<----------------------------------------------------------------------------------------->
    //Request Handler for creating new Exam. Parameter values : id=> id of the course. examdata=>data of the exams.
    @PostMapping("/create/{id}")
    public ResponseEntity<?> create(@PathVariable int id, @RequestBody exams examdata) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        if(getloginservice.getAuth(email)){
            exams currentsave=examservice.createExam(id, email, examdata);
            if(currentsave!=null){
                return new ResponseEntity<>(currentsave, HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


    }// Method End --> CreateExam

    //<---------------------------------------------------------------------------------->
    @GetMapping("/getexams/{id}")
    public ResponseEntity<?> getexams(@PathVariable int id) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        if(getloginservice.getAuth(email)){
            exams exam=examservice.getExam(id, email);
            if(exam!=null){
                return new ResponseEntity<>(exam, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


  }
  @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
      Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
      String email=authentication.getName();
      if(getloginservice.getAuth(email)){
          if(examservice.deleteExam(id)){
              return new ResponseEntity<>(HttpStatus.OK);
          }else{
              return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
          }
      }else{
          return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      }




  }

}
