package com.quizapp.Quiz.App.Entity;


import com.mongodb.lang.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;

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

    @Column(nullable = false)
    @OneToMany
    private List<result> result = new ArrayList<>();

    @Column(nullable = false)
    @OneToMany
    private List<exams> exams=new ArrayList<>();
}
