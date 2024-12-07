package com.quizapp.Quiz.App.Controller;


import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Repository.userRepo;
import com.quizapp.Quiz.App.Services.userService;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class User {

    @Autowired
    private userService userservice;


@GetMapping("/getuser")
public ResponseEntity<user> getbyemail() {
    Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
    String email=authentication.getName();
    if(email!=null){
        user userdata=userservice.Getuser(email);
        return new ResponseEntity<>(userdata, HttpStatus.OK);
    }
    else{
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}



    //<<----------------------------------------------------------------------------------->>

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody user user) {
    if(user!=null) {
        user Getuser=userservice.Getuser(user.getEmail());
        if(Getuser!=null) {
            userservice.Updateuser(user);
            return new ResponseEntity<>("Update", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Error", HttpStatus.CONFLICT);
        }
    }
    else {
        return new ResponseEntity<>("Error", HttpStatus.CONFLICT);
    }
    } //End of Function --->

    @PostMapping("/forgetpassword/{email}")
    public ResponseEntity<?> forgetpassword(@PathVariable String email) {
    if(email!=null) {
        int otp=userservice.forgetPasswordMailSender(email);

        return new ResponseEntity<>("OTP send, This is your "+otp, HttpStatus.OK);
    }else{
        return new ResponseEntity<>("email no found", HttpStatus.NOT_FOUND);
    }
    }

//  <------------------------------------------------------------------------->
//    <----------------Verify OTP--------------------------------------->
    @PostMapping("/forgetpassword/verify/{email}")
    public ResponseEntity<?> forgetpasswordverify(@RequestBody user user, @PathVariable String email) {
        boolean statusupdate=userservice.verifyandchange(user.getOtp(), user.getPassword(), email);
        if(statusupdate) {
            return new ResponseEntity<>("Password Changed"+user.getOtp(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Password Not Changed"+user.getOtp(), HttpStatus.NOT_FOUND);
        }
    }
    //<<--------------------------------------------------------------------->>
    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody String email) {
    if(email!=null) {
        System.out.println(email);
        boolean respose=userservice.Deleteuser(email);
        if(respose) {
            return new ResponseEntity<>("Delete", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
        }

    }else{
        return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
    }
    } //End of Function ---->
}
