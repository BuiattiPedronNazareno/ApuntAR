package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.MateriaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;

@Repository
public interface MateriaJpaRepository extends JpaRepository<Materia, Long>, MateriaRepositoryPort {
    
    Optional<Materia> findByNombre(String nombre);
    Optional<Materia> findByNivel(String nivel);
    Optional<Materia> findByNivelAcademico(String nivelAcademico);

}
