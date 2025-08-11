package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.NivelAcademicoRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.NivelAcademico;

@Repository
public interface NivelAcademicoJpaRepository extends JpaRepository<NivelAcademico, Long>, NivelAcademicoRepositoryPort {

    Optional<NivelAcademico> findByDescripcion(String descripcion);
    
}


