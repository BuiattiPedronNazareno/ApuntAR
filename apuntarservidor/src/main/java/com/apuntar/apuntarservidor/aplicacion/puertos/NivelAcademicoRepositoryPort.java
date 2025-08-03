package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.NivelAcademico;

public interface NivelAcademicoRepositoryPort {
    Optional<NivelAcademico> findAll();
    NivelAcademico findById(Long id);
    NivelAcademico findBtDescripcion(String descripcion);
}

/*Propuestas a ver:
    - consulta de las materias con ese nivelAcademico, si es necesario
*/