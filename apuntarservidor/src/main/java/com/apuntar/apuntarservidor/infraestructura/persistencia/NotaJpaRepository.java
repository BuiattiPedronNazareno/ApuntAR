package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.NotaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Nota;

@Repository
public interface NotaJpaRepository extends JpaRepository<Nota, Long>, NotaRepositoryPort {
    
    Optional<Nota> findByPrioridad(String prioridad);
    Optional<Nota> findByUsuarioId(Long usuarioId);
    Optional<Nota> findByMateriaId(Long materiaId);
    Optional<Nota> findByFechaCreacion(LocalDate fechaCreacion);
    Optional<Nota> findByTitulo(String titulo);

}
