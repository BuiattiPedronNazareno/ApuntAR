package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Nivel;

public interface NivelRepositoryPort {
    List<Nivel> findAll();
    Optional<Nivel> findById(Integer id);

    Optional<Nivel> findByDescripcion(Integer descripcion);

}
