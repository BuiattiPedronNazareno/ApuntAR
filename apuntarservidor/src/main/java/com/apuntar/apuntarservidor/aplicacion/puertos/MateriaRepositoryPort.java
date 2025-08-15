package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Materia;

public interface MateriaRepositoryPort {
    List<Materia> findAll();
    Optional<Materia> findById(Long id);
    Materia save(Materia materia);
    void deleteById(Long id);

    Optional<Materia> findByNombre(String nombre);
    Optional<Materia> findByNivel(String nivel);
    Optional<Materia> findByNivelAcademico(String nivelAcademico);
    boolean existsByNombre(String nombre);

    /*Propuestas a ver:
        - updates
        - otros deletes
        - consulta de las notas asociadas a esa materia
    */
}
