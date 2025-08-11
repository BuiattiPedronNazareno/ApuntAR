package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.NivelAcademico;

public interface NivelAcademicoRepositoryPort {
    List<NivelAcademico> findAll();
    Optional<NivelAcademico> findById(Long id);

    Optional<NivelAcademico> findByDescripcion(String descripcion);
    
}

/*Propuestas a ver:
    - consulta de las materias con ese nivelAcademico, si es necesario
*/