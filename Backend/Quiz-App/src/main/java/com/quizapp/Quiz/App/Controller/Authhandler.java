package com.quizapp.Quiz.App.Controller;

import com.quizapp.Quiz.App.Entity.examiner;
import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Services.CustomUserDetailsService;
import com.quizapp.Quiz.App.Services.examinerService;
import com.quizapp.Quiz.App.Services.userService;
import com.quizapp.Quiz.App.Utilies.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;


@RestController
//@CrossOrigin("http://localhost:3000")
@RequestMapping("/auth")
public class Authhandler {

// <--------------------------------------------------------------------------------------------------------------->
// <--------------------------------------------------------------------------------------------------------------->

    @Autowired //Annotation.
    private userService userservice; //Autowired userService class from Service.
    @Autowired
    private examinerService examinerservice;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
// <--------------------------------------------------------------------------------------------------------------->
// <--------------------------------------------------------------------------------------------------------------->

    @PostMapping("/signup/examiner")
    public ResponseEntity<?> signupExaminer(@RequestBody examiner examiner) {
        if(examiner!=null) {
           examiner examinerget=examinerservice.getExaminer(examiner.getEmail());
            if(examinerget==null) {
                if(examinerservice.createExaminer(examiner)){
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
            UserDetails userDetails= customUserDetailsService.loadUserByUsername(user.getEmail());
            Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) userDetails.getAuthorities();
            boolean hasRoleUser = authorities.stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_USER"));
            if(hasRoleUser) {
                String jwt=jwtUtil.generateToken(user.getEmail());
                return new ResponseEntity<>(jwt,HttpStatus.OK);
            }else {
                return new ResponseEntity<>("Error", HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
}//Method end -->loginUser

    @PostMapping("/login/examiner")
    public ResponseEntity<?> loginExaminer(@RequestBody examiner examiner) {
        try {
            System.out.println(examiner.getEmail() + " " + examiner.getPassword() );
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(examiner.getEmail(), examiner.getPassword()));
            UserDetails userDetailsexam= customUserDetailsService.loadUserByUsername(examiner.getEmail());
            Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) userDetailsexam.getAuthorities();
            boolean hasRoleUser = authorities.stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_EXAMINER"));
            if(hasRoleUser) {
                String jwt=jwtUtil.generateToken(examiner.getEmail());
                return new ResponseEntity<>(jwt,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("Email not Exists",HttpStatus.CONFLICT);
            }

        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    } //Method End -->loginExaminer

    @PostMapping("/login/user/autho")
    public ResponseEntity<?> loginAuthOUser(@RequestBody user user) {
        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            UserDetails userDetails= customUserDetailsService.loadUserByUsername(user.getEmail());
            String jwt=jwtUtil.generateToken(user.getEmail());
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
// <--------------------------------------------------------------------------------------------------------------->

// <--------------------------------------------------------------------------------------------------------------->
    @PostMapping("/login/check/{jwt}")
    public boolean checkjwt(@PathVariable String jwt){
        try {
            if(jwtUtil.isTokenExpired(jwt)){
                return true;
            }
            else{
                return false;
            }

        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }
}
