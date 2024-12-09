package com.quizapp.Quiz.App.Services;


import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Repository.userRepo;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userService {

    @Autowired
    private userRepo userrepositoryinstance;

    @Autowired
    private mailsender mailsenderinstance;

    @Autowired
    private randomNoGenerateandCheck randomnogenerateandcheck;



    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public Boolean CreateUser(@NotNull user userdata){
        user gettinguser=Getuser(userdata.getEmail());
        if(gettinguser!=null){
            return false;
        }
        else{
            userdata.setPassword(passwordEncoder.encode(userdata.getPassword()));
            userrepositoryinstance.save(userdata);
            mailsenderinstance.sendMail(userdata.getEmail(), "Account Created Successfully" , "Thank you for Creating your Account!");
            return true;
        }

    }
    public user Getuser(@NotNull String email) {
        user getuser;
//        System.out.println(email);
        getuser = userrepositoryinstance.findByEmail(email);
        if(getuser == null) {
            return null;
        } else{
            return getuser;
        }
    }
    public void Updateuser(@NotNull user userdata){
        userrepositoryinstance.save(userdata);
    }

    public boolean Deleteuser(@NotNull String email){
        System.out.println(email);
        user gettinguser= userrepositoryinstance.findByEmail(email);
//        System.out.println(gettinguser);
        if(gettinguser != null) {
            userrepositoryinstance.delete(gettinguser);
            return true;
        }else{

            return false;

        }
    }

    public int forgetPasswordMailSender(@NotNull String email){
        user gettinguser= userrepositoryinstance.findByEmail(email);
        System.out.println(gettinguser);
        if(gettinguser != null) {
            String useremail=gettinguser.getEmail();
            String name=gettinguser.getName();
            int otp=randomnogenerateandcheck.generateRandomNumber();
            System.out.println("OTP is"+otp);
            String Body="Hello"+name+", you requested as to Reset your existing password. To Reset your Existing password you" +
                    "have to enter this OTP(ONE TIME PASSWORD   " + otp +
                    "   *Remember* Do Not Share this OTP with Others";
            mailsenderinstance.otpMail(useremail, "OTP from Quizzer.com",Body);
            gettinguser.setOtp(otp);
            userrepositoryinstance.save(gettinguser);
            return otp;
        }
        else{
            return 0;
        }
    }

//    <---------------------------------------------------------------------------------->
//    <--------------------------Verify OPT and Change password-------------------------->
    public boolean verifyandchange(int opt, String password, String email){
        user user=userrepositoryinstance.findByEmail(email);
        if(user != null) {
            int getopt=user.getOtp();
            if(getopt == opt) {
                user.setPassword(passwordEncoder.encode(password));
                user.setOtp(0);
                userrepositoryinstance.save(user);
                return true;
            }else{
                return false;
            }
        }
        else{
            return false;
        }
    }// Method End verifyandchange
//--------------------------------------------------------------------------------------------------


    public boolean isExist(String email){
        user gettinguser=userrepositoryinstance.findByEmail(email);
        if(gettinguser != null) {
            return true;
        }
        else {
            return false;
        }
    }

}
