package com.apuntar.apuntarservidor.dominio.modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Materia", schema = "apuntarBD")
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String nombre;

    @Column(nullable = false)
    private Integer nivel;

    @Column(name = "nivelAcademico", nullable = false, length = 45)
    private String nivelAcademico;

}
