package com.apuntar.apuntarservidor.dominio.servicios;

import com.apuntar.apuntarservidor.dominio.modelos.Materia;

public class MateriaDomainService {
    
    public void validarCamposObligatorios(Materia materia){
        if (materia.getNombre() == null || materia.getNombre().isEmpty()){
            throw new RuntimeException("El nombre es obligatorio");
        }
    }
}
