package com.quizapp.Quiz.App.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class mailsender {

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(String to, String subject, String body){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("quizapp");
        mailSender.send(message);
    }


    public void otpMail(String to, String subject, String body){
        SimpleMailMessage message=new SimpleMailMessage();

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("quizapp");
        System.out.println(message);
        mailSender.send(message);

    }
}
