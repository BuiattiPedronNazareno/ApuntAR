package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Nota;

public interface NotaRepositoryPort {
    List<Nota> findAll();
    Optional<Nota> findById(Integer id);
    Nota save(Nota nota);
    void deleteById(Integer id);
    
    List<Nota> findByPrioridad(String prioridad);
    List<Nota> findByMateria_Id(Integer materiaID);
    List<Nota> findByFechaCreacion(LocalDate fechaCreacion);
    List<Nota> findByTitulo(String titulo);
    boolean existsByTitulo(String titulo);
    boolean existsByTituloAndMateria_Id(String titulo, Integer materiaId);
}
