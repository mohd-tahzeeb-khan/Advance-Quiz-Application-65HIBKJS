package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.course;
import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Services.courseService;
import org.antlr.v4.runtime.misc.NotNull;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("course")
public class Course {


    @Autowired
    private courseService courseservice;
    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody course course) {
        if(course!=null){
            courseservice.createCourse(course);
            return new ResponseEntity<>("Course Created Successfully", HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>("Course Creation Failed", HttpStatus.BAD_REQUEST);
        }
    }
// <------------------Add Exam into the Course by id ------------>
    @PostMapping("/addExam/{email}/{id}")
    public ResponseEntity<?> addexam(@PathVariable int id, @PathVariable String email, @RequestBody exams exam) {

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

    return new ResponseEntity<>("Exam is not added to the Course", HttpStatus.NOT_FOUND);
    }

// <----------
    @GetMapping("/getall")
    public List<course> getAllCourse(){
        return courseservice.getallcouse();
    }
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getCoursebyId(@NotNull @PathVariable int id){
        if(id!=0){
            course courseget=courseservice.getcourseById(id);
            if(courseget!=null){
                return new ResponseEntity<>(courseget, HttpStatus.OK);
            }else {
                return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
            }

        }
        return new ResponseEntity<>("Course Not Found", HttpStatus.NOT_FOUND);
    }
}
