package com.quizapp.Quiz.App.Controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizapp.Quiz.App.Entity.course;
import com.quizapp.Quiz.App.Entity.examiner;
import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Services.CustomUserDetailsService;
import com.quizapp.Quiz.App.Services.courseService;
import com.quizapp.Quiz.App.Services.examinerService;
import com.quizapp.Quiz.App.Services.getloginService;
import org.antlr.v4.runtime.misc.NotNull;
import org.eclipse.angus.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("course")
//@CrossOrigin("localhost:3000")
@CrossOrigin("http://localhost:4000")
public class Course {


    @Autowired
    private getloginService getloginservice;
//
//    @Autowired
//    private examiner examinerentity;

    @Autowired
    private examinerService examinerservice;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private courseService courseservice;
    @Autowired
    private com.quizapp.Quiz.App.Services.examinerService examinerService;


    @PostMapping("/createPM")
    public ResponseEntity<?> createCoursePM(@RequestBody course course) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        System.out.println(email);
        boolean state=courseservice.createCourse(email,course);
        if(state){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
//    -----------------------------------------------------------------------------------------
    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody Map<String, Object> payload) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        Object obj=payload.get("course");
        System.out.println(obj);

        if(examinerService.isExistsExaminer(email)){
            if(obj!=null){

                ObjectMapper mapper = new ObjectMapper();
                course course = mapper.convertValue(obj, course.class);
                System.out.println(course);
                courseservice.createCourse(email,course);
                return new ResponseEntity<>("Course Created Successfully", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("Course Creation Failed", HttpStatus.BAD_REQUEST);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
// <------------------Add Exam into the Course by id ------------>
//    This method will add the exam into the course. this method takes 1 pathvarible "id" the id is a unique for course.
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
//        return new ResponseEntity<>(courseservice.getallcouse(), HttpStatus.OK);
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        System.out.println(email);
        return new ResponseEntity<>(courseservice.getallcouse(), HttpStatus.OK);
//        if(getloginservice.getAuth(email)){
//            return new ResponseEntity<>(courseservice.getallcouse(), HttpStatus.OK);
//        }else{
//
//            return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
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


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable int id) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        if(getloginservice.getAuth(email)){
            if(id!=0){
                boolean status=courseservice.deletebyid(id);
                return new ResponseEntity<>(status, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
            }
        }
         else {
            return new ResponseEntity<>("User Not Found", HttpStatus.UNAUTHORIZED);
        }
    }
}
