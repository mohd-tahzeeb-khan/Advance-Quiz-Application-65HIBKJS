package com.quizapp.Quiz.App.Controller;

import com.quizapp.Quiz.App.Entity.exams;
import com.quizapp.Quiz.App.Services.examService;
import com.quizapp.Quiz.App.Services.getloginService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("exam")
@CrossOrigin(origins = "http://localhost:4000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
//@CrossOrigin("http://localhost:3000")
public class Exams {

    @Autowired
    private examService examservice;

    @Autowired
    private getloginService getloginservice;
    @Autowired
    private com.quizapp.Quiz.App.Services.userService userService;

    //<----------------------------------------------------------------------------------------->
    //Request Handler for creating new Exam. Parameter values : id=> id of the course. examdata=>data of the exams.
    @PostMapping("/create/{id}")
    public ResponseEntity<?> create(@PathVariable int id, @RequestBody exams examdata) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        System.out.println(email);
        System.out.println(id);
        System.out.println(examdata);
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
            exams exam=examservice.getExam(id);
            //System.out.println(exam);
//            return new ResponseEntity<>(exam, HttpStatus.OK);
            if(exam!=null){
                return new ResponseEntity<>(exam, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Exam not found", HttpStatus.NOT_FOUND);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


  }
//  This method is used to Delete the Exam from Dataabse. Parameter: id-> id of the Exam
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
  @GetMapping("/getallexam")
  public ResponseEntity<?> getAllExam() {
      Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
      String email=authentication.getName();
      if(email!=null){
          List<?> exams=examservice.getallexam();
          if(exams!=null){
              return new ResponseEntity<>(exams, HttpStatus.OK);
          }
          return new ResponseEntity<>("No Exams", HttpStatus.NOT_FOUND);
      }else{
          return new ResponseEntity<>("User s not valid", HttpStatus.UNAUTHORIZED);
      }
  }
    @GetMapping("/get-port")
    public String getPort(HttpServletRequest request) {
        // Get the port of the incoming request
        int port = request.getServerPort();
        return "Request received on port: " + port;
    }
    @PostMapping("/addmcqtoexam/{examid}/{mcqid}")
    public String addmcqextions(@PathVariable int examid, @PathVariable int mcqid) {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email=authentication.getName();
        if(getloginservice.getAuth(email)){
            String abc =examservice.addmcqtoexams(examid, mcqid);
            return "done";
        }
        else{
            return "Wrong";
        }
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> handleOptions() {
        return ResponseEntity.ok().build();
    }

}
