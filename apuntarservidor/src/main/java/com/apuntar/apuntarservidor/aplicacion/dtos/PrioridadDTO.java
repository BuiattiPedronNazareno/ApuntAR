package com.apuntar.apuntarservidor.aplicacion.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrioridadDTO {
    private Integer id;
    private String descripcion;
}
