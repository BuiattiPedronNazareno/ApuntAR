package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Nivel;

public interface NivelRepositoryPort {
    Optional<Nivel> findAll();
    Nivel findById(Long id);
    Nivel findByDescripcion(Integer descripcion);
}

/*Propuestas a ver:
    - consulta de las materias con ese nivel, si es necesario
*/