package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Nivel;

public interface NivelRepositoryPort {
    List<Nivel> findAll();
    Optional<Nivel> findById(Long id);

    Optional<Nivel> findByDescripcion(Integer descripcion);

}

/*Propuestas a ver:
    - consulta de las materias con ese nivel, si es necesario
*/