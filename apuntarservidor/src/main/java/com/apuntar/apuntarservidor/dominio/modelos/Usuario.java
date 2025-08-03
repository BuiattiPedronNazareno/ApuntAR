package com.apuntar.apuntarservidor.dominio.modelos;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String nombre;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String apellido;

    @Column(name = "nombreUsuario", length = 45)
    private String nombreUsuario;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String email;

    @Column(nullable = false, columnDefinition = "MEDIUMTEXT")
    private String contrasenia;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Nota> notas;
}
