package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.UsuarioRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Usuario;

@Repository
public interface UsuarioJpaRepository extends JpaRepository<Usuario, Long>, UsuarioRepositoryPort {
 
    @Override
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);

    @Override
    Optional<Usuario> findByEmail(String email);

    @Override
    boolean existsByEmail(String email);

    @Override
    boolean existsByNombreUsuario(String nombreUsuario);

}
