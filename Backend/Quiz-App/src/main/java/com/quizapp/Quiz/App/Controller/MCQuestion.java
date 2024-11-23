package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.mcq_handler;
import com.quizapp.Quiz.App.Entity.questions;
import com.quizapp.Quiz.App.Services.mcqService;
import com.quizapp.Quiz.App.Services.questionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("mcquestion")
public class MCQuestion {

    @Autowired
    private mcqService mcqservice;

    @Autowired
    private questionService questionservice;

    public MCQuestion(mcqService mcqservice) {
        this.mcqservice = mcqservice;
    }


    @PostMapping("/create")
    public ResponseEntity<mcq_handler> createMCQ(@RequestBody mcq_handler mcq) {
        mcq_handler savedMCQ = mcqservice.createmcq(mcq);
        return ResponseEntity.ok(savedMCQ);
    }

// <---------This Mapping is used to add Questions in the Exam------------>
    @PostMapping("/addquestions/{id}")
    public  ResponseEntity<?> createMCQ(@PathVariable int id, @RequestBody questions questions) {
        mcq_handler reutrned=mcqservice.addanswer(id, questions.getAnswer()); //Writing(Storing) Answers to the mcq_handler
        questions.setAnswer("");
        questionservice.addquestions(id, questions); ////Writing(Storing) Questions and Options to the question table
        return new ResponseEntity(reutrned, HttpStatus.OK);

    }

    // <---------This Mapping is used to Alter(Update) Questions and Options in the Existing Questions------------>
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMCQ(@NonNull @PathVariable int id, @RequestBody questions mcq) {
        questions responseupdate=mcqservice.updatedata(id, mcq);
        if (responseupdate == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(responseupdate,HttpStatus.OK);
    }


// <---------This Mapping is used to See all the question in the Exam------------>
    @GetMapping("/getallmcq")
    public ResponseEntity<List<mcq_handler>> getAllMCQs() {
        List<mcq_handler> mcqs = mcqservice.getdatabyall();
        return ResponseEntity.ok(mcqs);
    }
    // <---------This Mapping is used to see(View) the specific question in the Exam------------>
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMCQById(@PathVariable int id) {
        Optional<mcq_handler> mcq = mcqservice.getdatabyid(id);
        return new ResponseEntity<>(mcq, HttpStatus.OK);
    }
}
