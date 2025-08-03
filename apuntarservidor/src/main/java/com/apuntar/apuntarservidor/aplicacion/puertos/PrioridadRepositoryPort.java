package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Prioridad;

public interface PrioridadRepositoryPort {
    Optional<Prioridad> findAll();
    Prioridad findBtId(Long id);
    Prioridad findDescripcion(String descripcion);
}

/*Propuestas a ver:
    - consulta de las notas con esa prioridad, si es necesario
*/
