package com.quizapp.Quiz.App.Services;


import com.quizapp.Quiz.App.Entity.mcq_handler;
import com.quizapp.Quiz.App.Repository.mcqRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class mcqService {


    @Autowired
    private mcqRepo mcqrepoinstance;


    public mcq_handler createmcq(mcq_handler mcq) {
        mcq_handler responseback=mcqrepoinstance.save(mcq);
        return responseback;
    }

    public Optional<mcq_handler> getdatabyid(int id) {
        Optional<mcq_handler> responseback=mcqrepoinstance.findById(id);
        return responseback;
    }
    public List<mcq_handler> getdatabyall() {
        List<mcq_handler> responseback=mcqrepoinstance.findAll();
        return responseback;
    }
}
