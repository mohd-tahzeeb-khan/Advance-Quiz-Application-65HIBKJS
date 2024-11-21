package com.quizapp.Quiz.App.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.weaver.patterns.TypePatternQuestions;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class mcquestion {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "mcq", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<questions> questions = new ArrayList<>();
}
