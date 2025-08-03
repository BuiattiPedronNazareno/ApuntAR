package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.time.LocalDate;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Nota;

public interface NotaRepositoryPort {
    Optional<Nota> findAll();
    Nota findById(Long id);
    Nota save(Nota nota);
    void deleteById(Long id);
    
    Optional<Nota> findByPrioridad(String prioridad);
    Optional<Nota> findByUsuarioId(Long usuarioId);
    Optional<Nota> findByMateriaId(Long materiaId);
    Optional<Nota> findByFechaCreacion(LocalDate fechaCreacion);
    Optional<Nota> findByTitulo(String titulo);

    /*Propuestas a ver:
        - updates
        - otros deletes
    */

}
