package com.quizapp.Quiz.App.Services;

import com.quizapp.Quiz.App.Entity.examiner;
import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Repository.examinerRepo;
import com.quizapp.Quiz.App.Repository.examsRepo;
import com.quizapp.Quiz.App.Repository.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private userRepo userRepository;
//
//    @Autowired
//    private examinerRepo examinerRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        // First, check the user table
//        user user = userRepository.findByEmail(username);
//        if (user != null) {
//            return new org.springframework.security.core.userdetails.User(
//                    user.getEmail(),
//                    user.getPassword(),
//                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
//            );
//        }
//
//        // Next, check the examiner table
//        examiner examiner = examinerRepository.findByEmail(username);
//        if (examiner != null) {
//            return new org.springframework.security.core.userdetails.User(
//                    examiner.getEmail(),
//                    examiner.getPassword(),
//                    List.of(new SimpleGrantedAuthority("Examiner"))
//            );
//        }
//
//        throw new UsernameNotFoundException("User or Examiner not found with email: " + username);
//    }
//}

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private userRepo userRepository;

    @Autowired
    private examinerRepo examinerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // First, check the user table
        user user = userRepository.findByEmail(username);
        if (user != null) {
            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    authorities
            );
        }

        // Next, check the examiner table
        examiner examiner = examinerRepository.findByEmail(username);
        if (examiner != null) {
            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_EXAMINER"));
            return new org.springframework.security.core.userdetails.User(
                    examiner.getEmail(),
                    examiner.getPassword(),
                    authorities
            );
        }

        throw new UsernameNotFoundException("User or Examiner not found with email: " + username);
    }
}