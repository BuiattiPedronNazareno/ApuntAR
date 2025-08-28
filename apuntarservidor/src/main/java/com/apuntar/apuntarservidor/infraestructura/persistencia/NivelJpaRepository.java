package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.NivelRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Nivel;

@Repository
public interface NivelJpaRepository extends JpaRepository<Nivel, Integer>, NivelRepositoryPort{

    @Override
    Optional<Nivel> findByDescripcion(Integer descripcion);

}
