package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.course;
import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Services.courseService;
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
    public String createCourse(@RequestBody course course) {
        if(course!=null){

            courseservice.createCourse(course);
            return "Course added";
        }else{
            return "Course not added";
        }
    }

    @PostMapping("/addExam/{email}/{id}")
    public ResponseEntity<?> addexam(@PathVariable int id, @PathVariable String email, @RequestBody exams exam) {

        if(exam!=null){
           return courseservice.addexamtocouse(id, email, exam);

        }

            return new ResponseEntity<>("nhi hua", HttpStatus.NOT_FOUND);
    }
    @GetMapping("/getall")
    public List<course> getAllCourse(){
        return courseservice.getallcouse();
    }
}
