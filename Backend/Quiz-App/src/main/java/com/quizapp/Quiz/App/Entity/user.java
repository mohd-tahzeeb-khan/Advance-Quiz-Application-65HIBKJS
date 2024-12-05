package com.quizapp.Quiz.App.Entity;


//import com.mongodb.lang.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "user")
public class user {

    @Id
   @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

   @Column(nullable = false)
    private String name;

   @Column(nullable = false)
    private Character gender;

   @Column(nullable = false)
    private String mobile;

   @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private int zip;

    @Column(nullable = true)
    private int otp=0;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<result> result = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<exams> exams = new ArrayList<>();
//    @Column(nullable = false)
//    @OneToMany(mappedBy = "exam_id")
//    private List<exams> exams=new ArrayList<>();
}
