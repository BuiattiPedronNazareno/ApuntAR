package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Materia;

public interface MateriaRepositoryPort {
    
    List<Materia> findAll();
    Optional<Materia> findById(Integer id);
    Materia save(Materia materia);
    void deleteById(Integer id);

    Optional<Materia> findByNombre(String nombre);
    List<Materia> findByNivel(Integer nivel);
    List<Materia> findByNivelAcademico(String nivelAcademico);
    boolean existsByNombre(String nombre);

}
