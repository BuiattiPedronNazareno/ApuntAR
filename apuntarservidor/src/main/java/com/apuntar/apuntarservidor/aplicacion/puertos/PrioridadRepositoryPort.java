package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Prioridad;

public interface PrioridadRepositoryPort {
    List<Prioridad> findAll();
    Optional<Prioridad> findById(Long id);

    Optional<Prioridad> findByDescripcion(String descripcion);
    
}

