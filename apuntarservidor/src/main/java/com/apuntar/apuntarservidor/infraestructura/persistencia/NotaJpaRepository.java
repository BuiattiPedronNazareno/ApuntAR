package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.NotaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Nota;

@Repository
public interface NotaJpaRepository extends JpaRepository<Nota, Integer>, NotaRepositoryPort {
    
    @Override
    List<Nota> findByPrioridad(String prioridad);

    @Override
    List<Nota> findByMateria_Id(Integer materiaID);

    @Override
    List<Nota> findByFechaCreacion(LocalDate fechaCreacion);

    @Override
    List<Nota> findByTitulo(String titulo);

    @Override
    boolean existsByTitulo(String titulo);

    @Override
    boolean existsByTituloAndMateria_Id(String titulo, Integer materiaId);

}
