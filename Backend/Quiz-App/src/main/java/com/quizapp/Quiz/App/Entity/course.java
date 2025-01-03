package com.quizapp.Quiz.App.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

//@Entity
//@Data
//@NoArgsConstructor
//public class course {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//
//    @Column(nullable = false)
//    private String name;
//
//
//    @Column(nullable = false)
//    private String category;
//
//    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
//    @Nullable
//    @ToString.Exclude
//    private List<exams> exams = new ArrayList<>();
//
//
//    @ManyToOne
//    @JoinColumn(name = "examiner", nullable = false)
//    @JsonIgnore
//    private examiner examiner_course;
//}

@Entity
@Data
@NoArgsConstructor
public class course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @Nullable
    @ToString.Exclude
    @JsonIgnore
    private List<exams> exams = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "examiner", nullable = false)
    @JsonIgnore
    private examiner examiner_course;
}
