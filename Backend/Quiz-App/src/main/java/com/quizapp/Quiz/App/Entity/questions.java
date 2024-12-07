package com.quizapp.Quiz.App.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class questions {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String question;

    @ElementCollection
    @CollectionTable(name="question_options", joinColumns =@JoinColumn(name = "question_id") )
    @Column(name = "options")
    private List<String> options;


    @Nullable
    private String answer;

    @ManyToOne
    @JoinColumn(name = "exams", nullable = false)
    @JsonIgnore
    private exams exams;
}
