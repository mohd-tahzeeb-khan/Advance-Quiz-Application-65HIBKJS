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

    public ResponseEntity<?> addexamtocouse(@NonNull int id, @NonNull String username, @NonNull exams exams) {
        exams currentsaveexams=examservice.createExam(username, exams);
        int idd=currentsaveexams.getExam_id();
        exams examdetails=examservice.getExam(idd);

        Optional<course> course=courserepoinstance.findById(id);
        course currentcourse=course.get();
        System.out.println(currentcourse);
        currentcourse.getExams().add(currentsaveexams);
        System.out.println(currentcourse);
        courserepoinstance.save(currentcourse);
        return new ResponseEntity<>(currentsaveexams, HttpStatus.OK);



    }
    public List<course> getallcouse(){
        return courserepoinstance.findAll();
    }
}
