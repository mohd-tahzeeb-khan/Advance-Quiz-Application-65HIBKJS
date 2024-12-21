package com.quizapp.Quiz.App.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quizapp.Quiz.App.Controller.Result;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//@Entity
//@Data
//@NoArgsConstructor
//public class exams {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(unique = true, nullable = false)
//    private int exam_id;
//
//    @Column(nullable = false)
//    private String title;
//
//    @Column(nullable = false)
//    private String description;
//
//    @Column(nullable = false)
//    private int total_marks;
//
//    @Column(nullable = false)
//    private String creator;
//
//    @Column(nullable = false)
//    private LocalDateTime dateCreate;
//
//    @Column(nullable = true)
//    private String expiredate;
//    @Column(nullable =false)
//    private int duration;
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "result_id")
//    @Nullable
//    private result result;
//
//
//    @ElementCollection
//    @Column(name = "answers")
//    private List<String> answers = new ArrayList<>();
//
//    @ManyToOne
//    @JoinColumn(name="course_id")
//    @JsonIgnore
//    @Nullable
//    @ToString.Exclude
//    private course course;
//
//    @ManyToOne
//    @JoinColumn(name="examiner")
//    @JsonIgnore
//    @Nullable
//    private examiner examiner_exams;
//
//    @OneToMany(mappedBy = "exams", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<questions> questions = new ArrayList<>();
//}
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

    @Column(nullable = true)
    private String expiredate;

    @Column(nullable = false)
    private int duration;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "result_id")
    @Nullable
    private result result;

    @ElementCollection
    @Column(name = "answers")
    private List<String> answers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonBackReference // Avoid circular reference during JSON serialization
    @Nullable
    @ToString.Exclude
    private course course;

    @ManyToOne
    @JoinColumn(name = "examiner")
    @JsonIgnore
    @Nullable
    private examiner examiner_exams;

    @OneToMany(mappedBy = "exams", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<questions> questions = new ArrayList<>();
}
