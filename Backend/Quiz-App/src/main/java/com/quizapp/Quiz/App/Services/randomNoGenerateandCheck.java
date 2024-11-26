package com.quizapp.Quiz.App.Services;

import org.springframework.stereotype.Service;

import java.util.Random;


@Service
public class randomNoGenerateandCheck {
    public int generateRandomNumber() {
        Random random=new Random();
        int min=9999;
        int max=99999;
        int randomno=random.nextInt(max-min+1)+min;
        return randomno;
    }


    public boolean equals(int gettingno, int sendedno){
        if(gettingno==0 || sendedno==0){
            return false;
        }
        else{
            if(gettingno==sendedno){
                return true;
            }
            else{
                return false;
            }
        }

    }


}
