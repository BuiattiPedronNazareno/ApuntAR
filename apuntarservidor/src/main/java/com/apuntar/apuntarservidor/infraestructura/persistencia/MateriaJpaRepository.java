package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.MateriaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;

@Repository
public interface MateriaJpaRepository extends JpaRepository<Materia, Long>, MateriaRepositoryPort {
    
    @Override
    Optional<Materia> findByNombre(String nombre);

    @Override
    Optional<Materia> findByNivel(String nivel);

    @Override
    Optional<Materia> findByNivelAcademico(String nivelAcademico);

}
