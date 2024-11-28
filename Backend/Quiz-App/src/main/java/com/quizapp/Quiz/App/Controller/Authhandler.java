package com.quizapp.Quiz.App.Controller;

import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Services.userService;
import com.quizapp.Quiz.App.Utilies.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


@RestController
//@CrossOrigin("http://localhost:3000")
@RequestMapping("/auth")
public class Authhandler {

// <--------------------------------------------------------------------------------------------------------------->
// <--------------------------------------------------------------------------------------------------------------->

    @Autowired //Annotation.
    private userService userservice; //Autowired userService class from Service.
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userdetailsservice;
    @Autowired
    private JwtUtil jwtUtil;
// <--------------------------------------------------------------------------------------------------------------->
// <--------------------------------------------------------------------------------------------------------------->

    @PostMapping("/signup/examiner")
    public ResponseEntity<?> signupExaminer(@RequestBody user user) {
        if(user!=null) {
            user usergetting=userservice.Getuser(user.getEmail());
            if(usergetting==null) {
                if(userservice.CreateUser(user)){
                    return new ResponseEntity<>(HttpStatus.CREATED);
                }
                else{
                    return new ResponseEntity<>("Already Registered Email address",HttpStatus.CONFLICT);
                }
            }
            else{
                return new ResponseEntity<>("Email Already Exists",HttpStatus.CONFLICT);
            }

        }
        else{
            return new ResponseEntity<>("Error", HttpStatus.CONFLICT);
        }
    } //Function end -->SignupExaminer
// <--------------------------------------------------------------------------------------------------------------->

// <-----------------------------------------Controller for User(Examinee) signup---------------------------------->
    @PostMapping("/signup/user")
    public ResponseEntity<?> signupUser(@RequestBody user user) {
        if(user!=null) {
            user usergetting=userservice.Getuser(user.getEmail());
            if(usergetting==null) {
                if(userservice.CreateUser(user)){
                    return new ResponseEntity<>(HttpStatus.CREATED);
                }
                else{
                    return new ResponseEntity<>("Already Registered Email address",HttpStatus.CONFLICT);
                }
            }
            else{
                return new ResponseEntity<>("Email Already Exists",HttpStatus.CONFLICT);
            }

        }
        else{
            return new ResponseEntity<>("Error", HttpStatus.CONFLICT);
        }

    }//Function end -->signupUser
// <--------------------------------------------------------------------------------------------------------------->
@PostMapping("/login/user")
    public ResponseEntity<?> loginUser(@RequestBody user user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            UserDetails userDetails= userdetailsservice.loadUserByUsername(user.getEmail());
            String jwt=jwtUtil.generateToken(user.getEmail());
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
}//Method end -->loginUser

    @PostMapping("/login/user/autho")
    public ResponseEntity<?> loginAuthOUser(@RequestBody user user) {
        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            UserDetails userDetails= userdetailsservice.loadUserByUsername(user.getEmail());
            String jwt=jwtUtil.generateToken(user.getEmail());
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
// <--------------------------------------------------------------------------------------------------------------->


    @PostMapping("/login/examiner")
    public ResponseEntity<?> loginExaminer(@RequestBody user user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            UserDetails userDetails= userdetailsservice.loadUserByUsername(user.getEmail());
            String jwt=jwtUtil.generateToken(user.getEmail());
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    } //Method End -->loginExaminer
// <--------------------------------------------------------------------------------------------------------------->
}
