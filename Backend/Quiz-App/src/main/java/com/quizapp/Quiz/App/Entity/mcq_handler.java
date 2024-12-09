package com.quizapp.Quiz.App.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class mcq_handler {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

//    @OneToMany(mappedBy = "mcq_handler", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<questions> questions = new ArrayList<>();
//
//    @OneToOne(mappedBy = "mcq_handler", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private exams exams;
//}
}
