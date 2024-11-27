package com.quizapp.Quiz.App.Services;

import java.util.ArrayList;
import java.util.List;
import com.quizapp.Quiz.App.Controller.Course;
import com.quizapp.Quiz.App.Entity.course;
import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Repository.courseRepo;
import com.quizapp.Quiz.App.Repository.examsRepo;
import org.hibernate.annotations.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;



@Service
public class courseService {


    @Autowired
    private courseRepo courserepoinstance;

    @Autowired
    private examService examservice;

    exams exam1 = new exams();


    public boolean createCourse(@NonNull course coursedata) {
        courserepoinstance.save(coursedata);
        return true;
    }

    public boolean addexamtocouse(@NonNull int id, @NonNull String username, @NonNull exams exams) {
        exams currentsaveexams=examservice.createExam(id, username, exams);
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        int idd=currentsaveexams.getExam_id();
        exams examdetails=examservice.getExam(idd, email);
        if(examdetails!=null){
            Optional<course> course=courserepoinstance.findById(id);
            course currentcourse=course.get();
            currentcourse.getExams().add(currentsaveexams);
            courserepoinstance.save(currentcourse);
            return true;

        }
        else{
            return false;
        }






    }
    public Optional<course> getCourseById(int id){
        if(courserepoinstance.findById(id).isPresent()){
            return courserepoinstance.findById(id);
        }
        return null;
    }
    public List<course> getallcouse(){
        return courserepoinstance.findAll();
    }


    public boolean isExist(int id) {
        if(courserepoinstance.findById(id).isPresent()) {
            return true;
        }
        else{
            return false;
        }
    }
    public course getcourseById(int id) {
        Optional<course> course=courserepoinstance.findById(id);
        if(course.isPresent()){
            return course.get();
        }
        else{
            return null;
        }
    }
}
