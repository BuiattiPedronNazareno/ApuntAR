package com.apuntar.apuntarservidor.aplicacion.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MateriaDTO {
    private Integer id;
    private String nombre;
    private Integer nivel;
    private String nivelAcademico;
}