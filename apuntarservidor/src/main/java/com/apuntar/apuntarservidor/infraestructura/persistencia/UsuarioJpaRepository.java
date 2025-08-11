package com.apuntar.apuntarservidor.infraestructura.persistencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apuntar.apuntarservidor.aplicacion.puertos.UsuarioRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Usuario;

@Repository
public interface UsuarioJpaRepository extends JpaRepository<Usuario, Long>, UsuarioRepositoryPort {
 
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    Optional<Usuario> findByEmail(String email);

}
