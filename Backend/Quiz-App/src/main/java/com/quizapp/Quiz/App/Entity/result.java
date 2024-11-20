package com.quizapp.Quiz.App.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.NotFound;

@Entity
@Data
@NoArgsConstructor
public class result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, name = "id")
    private int id;

    @NotNull
    private float score;

    @OneToOne(mappedBy = "result")
    private exams exams;
//    @ManyToOne
//    @JoinColumn(name = "user_id_email", referencedColumnName = "email")


    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private user user;
}
