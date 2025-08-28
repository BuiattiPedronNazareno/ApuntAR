package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.MateriaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;

@Repository
public interface MateriaJpaRepository extends JpaRepository<Materia, Integer>, MateriaRepositoryPort {
    
    @Override
    Optional<Materia> findByNombre(String nombre);

    @Override
    List<Materia> findByNivel(Integer nivel);

    @Override
    List<Materia> findByNivelAcademico(String nivelAcademico);

    @Override
    boolean existsByNombre(String nombre);

}
