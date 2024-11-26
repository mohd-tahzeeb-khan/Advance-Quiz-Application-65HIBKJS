package com.quizapp.Quiz.App.Services;

import com.quizapp.Quiz.App.Controller.Course;
import com.quizapp.Quiz.App.Controller.Result;
import com.quizapp.Quiz.App.Controller.User;
import com.quizapp.Quiz.App.Entity.course;
import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Entity.result;
import com.quizapp.Quiz.App.Entity.user;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.quizapp.Quiz.App.Repository.examsRepo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class examService {

    @Autowired
    private examsRepo examsRepo;
    @Autowired
    private userService userservice;

    @Autowired
    private resultService resultservice;

    @Autowired
    private courseService courseservice;


    //Input Parameter id=>This is the Course id which is primary key in course. , email=>username(Email) is a primary key for the Examiner, examdata=>exam data.
    public exams createExam(int id, String email, exams examdata){
        if(examdata !=null) {
            if(courseservice.isExist(id) && userservice.isExist(email)){
                Optional<course> getcourse=courseservice.getCourseById(id);
                course course = getcourse.get();
                user currentuser = userservice.Getuser(email);
                    if(currentuser != null && course!=null){
                        List<result> currentuserresult = resultservice.getuserresult(email);
                        examdata.setDateCreate(LocalDateTime.now());
                        examdata.setCreator(email);
                        examdata.setUser(currentuser);
                        examdata.setCourse(course);
                        return examsRepo.save(examdata);
                    }

            }
            else{
                return null;
            }




        }
        return null;
        }
    public exams getExam(int id){
        return examsRepo.findById(id).orElse(null);

    }
    public boolean deleteExam(int id){
        if(examsRepo.existsById(id)){
            examsRepo.deleteById(id);
            return true;
        }
        else{
            return false;
        }



    }
    }


//}
