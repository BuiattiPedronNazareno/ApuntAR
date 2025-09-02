package com.apuntar.apuntarservidor.aplicacion.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotaDTO {
    
    private Integer id;
    private String titulo;
    private String contenido;
    private String prioridad;
    private LocalDate fechaCreacion;
    private MateriaDTO materia;

}
