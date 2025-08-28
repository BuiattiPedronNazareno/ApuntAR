package com.apuntar.apuntarservidor.aplicacion.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NivelAcademicoDTO {
    private Integer id;
    private String descripcion;
}
