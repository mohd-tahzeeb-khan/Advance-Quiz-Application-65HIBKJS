package com.quizapp.Quiz.App.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class exams {
    @Id
    private String Id;
}
