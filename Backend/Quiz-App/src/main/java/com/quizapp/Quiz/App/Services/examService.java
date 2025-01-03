package com.quizapp.Quiz.App.Services;

import com.quizapp.Quiz.App.Entity.*;
import jakarta.transaction.Transactional;
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
    private examinerService examService;

    @Autowired
    private resultService resultservice;

    @Autowired
    private courseService courseservice;


    @Autowired
    private examinerService examinerservice;
    @Autowired
    private mcqService mcqservice;
    @Autowired
    private com.quizapp.Quiz.App.Services.examinerService examinerService;


    //Input Parameter id=>This is the Course id which is primary key in course. , email=>username(Email) is a primary key for the Examiner, examdata=>exam data.
    @Transactional
    public exams createExam(int id, String email, exams examdata){
        if(examdata !=null) {
            if(courseservice.isExist(id) && examinerservice.isExistsExaminer(email)){
                Optional<course> getcourse=courseservice.getCourseById(id);
                course course = getcourse.get();
                examiner currentexaminer = examinerservice.getExaminer(email);
                    if(currentexaminer != null && course!=null){
                        System.out.println("currentexaminer exists..");
                        //List<result> currentuserresult = resultservice.getuserresult(email);
                        examdata.setDateCreate(LocalDateTime.now());
                        examdata.setCreator(email);
                        examdata.setCourse(course);
                        examdata.setExaminer_exams(currentexaminer);
                        examdata.setExpiredate("Not-Defined");
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
        System.out.println(id);
        if(id!=0){
            System.out.println("Here is the right way.");
            try {
                System.out.println("getexam-1");
                exams getexam=examsRepo.findById(id).orElse(null);
                System.out.println("..");
                return getexam;
                //System.out.println("here is the error"+getexam);
            }catch (Exception e){
                System.out.println("getexam-2");
                System.out.println(e.getMessage());
            }
                return null;
//            return examsRepo.findById(id).orElse(null);
        }
        else{
            System.out.println("Here is the Wrong way.");
            return null;
        }

    }
    public exams geteExam(int id){
        System.out.println(id);
        if(id!=0){
            System.out.println("Here is the right way.");
            try {
                exams getexam=examsRepo.findById(id).orElse(null);
                //System.out.println("here is the error"+getexam);
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
            //return null;
            return examsRepo.findById(id).orElse(null);
        }
        else{
            System.out.println("Here is the Wrong way.");
            return null;
        }

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
    public List<?> getallexam(){
        List<?> exams= examsRepo.findAll();
        if(exams.size()>0){
            return exams;
        }else{
            return null;
        }
    }

    public  String addmcqtoexams(int examid, int mcqid){
        exams exam=examsRepo.findById(examid).orElse(null);
        mcq_handler mcqs=mcqservice.getdatabyid(mcqid).orElse(null);

        if(exam==null && mcqs==null){
            return "No Exam found";
        }else{
           // exam.setMcq_handler(mcqs);
            examsRepo.save(exam);
        }
        return "ander hi nhi gaya";
    }
    }


//}
