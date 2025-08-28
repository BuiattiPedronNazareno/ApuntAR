package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.PrioridadRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Prioridad;

@Repository
public interface PrioridadJpaRepository extends JpaRepository<Prioridad, Integer>, PrioridadRepositoryPort {
    
    @Override
    Optional<Prioridad> findByDescripcion(String descripcion);

}
