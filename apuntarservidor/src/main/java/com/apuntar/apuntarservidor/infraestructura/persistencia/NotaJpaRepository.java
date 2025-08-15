package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.NotaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Nota;

@Repository
public interface NotaJpaRepository extends JpaRepository<Nota, Long>, NotaRepositoryPort {
    
    @Override
    Optional<Nota> findByPrioridad(String prioridad);

    @Override
    Optional<Nota> findByUsuarioId(Long usuarioId);

    @Override
    Optional<Nota> findByMateriaId(Long materiaId);

    @Override
    Optional<Nota> findByFechaCreacion(LocalDate fechaCreacion);

    @Override
    Optional<Nota> findByTitulo(String titulo);

    @Override
    boolean existsByTitulo(String titulo);

}
