package com.apuntar.apuntarservidor.dominio.servicios;

import com.apuntar.apuntarservidor.dominio.modelos.Nota;

public class NotaDomainService {
    
    public void validarCamposObligatorios(Nota nota){
        if(nota.getTitulo() == null || nota.getTitulo().isEmpty()){
            throw new RuntimeException("El título de la nota es obligatorio");
        }
        if(nota.getFechaCreacion() == null || nota.getFechaCreacion().isEmpty()){
            throw new RuntimeException("La fecha creación de la nota es obligatorio");
        }
        if(nota.getMateria() == null){
            throw new RuntimeException("La materia de la nota es obligatorio");
        }
        if(nota.getUsuario() == null){
            throw new RuntimeException("El usuario de la nota es obligatorio");
        }
    }

}
