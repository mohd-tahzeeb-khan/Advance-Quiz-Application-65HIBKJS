package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.course;
import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Services.courseService;
import com.quizapp.Quiz.App.Services.getloginService;
import org.antlr.v4.runtime.misc.NotNull;
import org.eclipse.angus.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("course")
//@CrossOrigin("localhost:3000")
@CrossOrigin("http://localhost:3000")
public class Course {


    @Autowired
    private getloginService getloginservice;

    @Autowired
    private courseService courseservice;
    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody course course) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        if(getloginservice.getAuth(email)){
            if(course!=null){
                courseservice.createCourse(course);
                return new ResponseEntity<>("Course Created Successfully", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("Course Creation Failed", HttpStatus.BAD_REQUEST);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
// <------------------Add Exam into the Course by id ------------>
    @PostMapping("/addExam/{id}")
    public ResponseEntity<?> addexam(@PathVariable int id,@RequestBody exams exam) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        if(getloginservice.getAuth(email)){
            try {
                if(exam!=null){
                    if(courseservice.addexamtocouse(id, email, exam)){
                        return new ResponseEntity<>("Exam added to the Course", HttpStatus.OK);
                    }
                }
            }catch (Exception e){

                e.printStackTrace();
                return new ResponseEntity<>("Exam is Null", HttpStatus.NOT_FOUND);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    return new ResponseEntity<>("Exam is not added to the Course", HttpStatus.NOT_FOUND);
    }

// <----------
    @GetMapping("/getall")
    public ResponseEntity<?> getAllCourse(){
        return new ResponseEntity<>(courseservice.getallcouse(), HttpStatus.OK);
//        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
//        String email=authentication.getName();
//        if(getloginservice.getAuth(email)){
//            return new ResponseEntity<>(courseservice.getallcouse(), HttpStatus.OK);
//        }else{
//
      //      return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
//        }

    }
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getCoursebyId(@NotNull @PathVariable int id){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        if(getloginservice.getAuth(email)){
            if(id!=0){
                course courseget=courseservice.getcourseById(id);
                
                if(courseget!=null){
                    return new ResponseEntity<>(courseget, HttpStatus.OK);
                }else {
                    return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
                }

            }else{
                return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>("Course Not Found", HttpStatus.NOT_FOUND);
    }
}
