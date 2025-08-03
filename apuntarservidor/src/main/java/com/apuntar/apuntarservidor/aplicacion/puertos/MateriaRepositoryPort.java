package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Materia;

public interface MateriaRepositoryPort {
    Optional<Materia> findAll();
    Materia findById(Long id);
    Materia save(Materia materia);
    void deleteById(Integer id);

    Materia findByNombre(String nombre);
    Materia findByNivel(String nivel);
    Materia findByNivelAcademico(String nivelAcademico);

    /*Propuestas a ver:
        - updates
        - otros deletes
        - consulta de las notas asociadas a esa materia
    */
}
