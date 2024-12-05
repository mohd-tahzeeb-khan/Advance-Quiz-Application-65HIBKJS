package com.quizapp.Quiz.App.Services;


import com.quizapp.Quiz.App.Entity.examiner;
import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Repository.examinerRepo;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class examinerService {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private examinerRepo examinerrepo;

    public boolean createExaminer(examiner examiner) {
        examiner.setPassword(passwordEncoder.encode(examiner.getPassword()));
        examiner.setRole("Examiner");
        examinerrepo.save(examiner);
        return true;
    }

    public examiner getExaminer(@NotNull String email) {
            examiner examiner = examinerrepo.findByEmail(email);
            if(examiner == null) {
                return null;
            }else{
                return examiner;
            }
    }
    public boolean isExistsExaminer(@NotNull String email) {
        examiner examiner = examinerrepo.findByEmail(email);
        if(examiner == null) {
            return false;
        }
        else{
            return true;
        }
    }
}
