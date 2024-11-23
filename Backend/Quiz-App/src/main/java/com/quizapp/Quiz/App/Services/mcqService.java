package com.quizapp.Quiz.App.Services;


import com.quizapp.Quiz.App.Entity.mcq_handler;
import com.quizapp.Quiz.App.Entity.questions;
import com.quizapp.Quiz.App.Repository.mcqRepo;
import com.quizapp.Quiz.App.Repository.questionsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class mcqService {


    @Autowired
    private mcqRepo mcqrepoinstance;

    @Autowired
    private questionsRepo questionsrepoinstance;




    public mcq_handler createmcq(mcq_handler mcq) {
        mcq_handler responseback=mcqrepoinstance.save(mcq);
        return responseback;
    }

    public mcq_handler addanswer(int id, String answer) {
        Optional<mcq_handler> getmcq=mcqrepoinstance.findById(id);
        if (getmcq.isPresent()) {
            mcq_handler mcq=getmcq.get();
            mcq.getAnswers().add(answer);
            return  mcqrepoinstance.save(mcq);

        }
        return  null;
    }

    public Optional<mcq_handler> getdatabyid(int id) {
        Optional<mcq_handler> responseback=mcqrepoinstance.findById(id);
        return responseback;
    }
    public List<mcq_handler> getdatabyall() {
        List<mcq_handler> responseback=mcqrepoinstance.findAll();
        return responseback;
    }
    public questions updatedata(int id, questions questions){
        questions getdata= questionsrepoinstance.getById(id);
        if(getdata!=null){
//            getdata.setAnswer(questions.getAnswer());
            getdata.setQuestion(questions.getQuestion());
            return questionsrepoinstance.save(getdata);
        }
        return null;
    }

}
