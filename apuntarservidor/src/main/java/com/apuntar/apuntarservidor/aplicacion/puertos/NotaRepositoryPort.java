package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Nota;

public interface NotaRepositoryPort {
    List<Nota> findAll();
    Optional<Nota> findById(Long id);
    Nota save(Nota nota);
    void deleteById(Long id);
    
    Optional<Nota> findByPrioridad(String prioridad);
    Optional<Nota> findByUsuarioId(Long usuarioId);
    Optional<Nota> findByMateriaId(Long materiaId);
    Optional<Nota> findByFechaCreacion(LocalDate fechaCreacion);
    Optional<Nota> findByTitulo(String titulo);
    boolean existsByTitulo(String titulo);

}
