package com.apuntar.apuntarservidor.dominio.modelos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Nota", schema = "apuntarBD")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(columnDefinition = "LONGTEXT")
    private String contenido;
    
    @Column(name = "fechaCreacion", nullable = false)
    private LocalDate fechaCreacion;

    @Column(length = 45)
    private String prioridad;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String titulo;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "materiaID", referencedColumnName = "ID")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Materia materia;
    
}
