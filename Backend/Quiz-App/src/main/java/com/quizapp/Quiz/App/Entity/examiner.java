package com.quizapp.Quiz.App.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@Table(name = "examiner")
public class examiner {


    @Id
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable=false)
    private String role;

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


    @OneToMany(mappedBy = "examiner_course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<course> course = new ArrayList<>();



    @OneToMany(mappedBy = "examiner_exams")
    private List<exams> exams=new ArrayList<>();


}
