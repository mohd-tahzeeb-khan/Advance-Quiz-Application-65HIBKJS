package com.quizapp.Quiz.App.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quizapp.Quiz.App.Controller.Result;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class exams {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private int exam_id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int total_marks;

    @Column(nullable = false)
    private String creator;

    @Column(nullable = false)
    private LocalDateTime dateCreate;

    @Column(nullable = false)
    private String expiredate;
    @Column(nullable =false)
    private int duration;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "result_id")
    @Nullable
    private result result;

//    @ManyToOne
//    @JoinColumn(name="user_id")
//    @JsonIgnore
//    @Nullable
//    private user user;


    @ElementCollection
    @Column(name = "answers")
    private List<String> answers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="course_id")
    @JsonIgnore
    @Nullable
    private course course;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "mcq_id", referencedColumnName = "id")
//    private mcq_handler mcq_handler;

    @ManyToOne
    @JoinColumn(name="examiner")
    @JsonIgnore
    @Nullable
    private examiner examiner_exams;

    @OneToMany(mappedBy = "exams", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<questions> questions = new ArrayList<>();
}
