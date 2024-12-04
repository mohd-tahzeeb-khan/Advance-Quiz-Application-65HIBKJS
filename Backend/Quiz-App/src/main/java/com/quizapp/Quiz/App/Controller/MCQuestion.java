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

import java.util.*;

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

    @PostMapping("/savedata")
    public void  savedata(@RequestBody Map<String, Object> payload) {
        Object payloadarray = payload.get("mcq");
        System.out.println(payloadarray);
        if (payloadarray instanceof List<?>) {
            // Safely cast to a List
            List<?> mcqList = (List<?>) payloadarray;

            // Iterate through the list
            for (Object item : mcqList) {
                if (item instanceof Map<?, ?>) {
                    // Cast each item to a Map
                    Map<String, Object> mcqItem = (Map<String, Object>) item;

                    // Extract individual fields
                    Object id = mcqItem.get("id");
                    Object question = mcqItem.get("question");
                    Object statement = mcqItem.get("statement");
                    Object code = mcqItem.get("code");
                    Object options = mcqItem.get("options"); // Likely a list
                    Object correctAnswer = mcqItem.get("correctAnswer");
                    System.out.println(id);
                    System.out.println(question);
                    System.out.println(statement);
                    System.out.println(code);
                    System.out.println(options);
                    System.out.println(correctAnswer);
                    questions questionsdata = new questions();
                    questionsdata.setQuestion((String) question);
                    questionsdata.setOptions((List<String>) options);
                    questionsdata.setAnswer((String) correctAnswer);
                    questionservice.addquestions(1, questionsdata);



    }}}}
//        for (Map<String, Object> entry : payload.get("mcq")) {
//            Long id = (Long) entry.get("id"); // Extract ID
//            String question = (String) entry.get("question"); // Extract question
//            String statement = (String) entry.get("statement"); // Extract statement
//            String code = (String) entry.get("code"); // Extract code
//            List<String> options = (List<String>) entry.get("options"); // Extract options
//            String correctAnswer = (String) entry.get("correctAnswer");
//
//        }
}
