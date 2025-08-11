package com.apuntar.apuntarservidor.aplicacion.puertos;

import java.util.List;
import java.util.Optional;

import com.apuntar.apuntarservidor.dominio.modelos.Usuario;

public interface UsuarioRepositoryPort {
    List<Usuario> findAll();
    Optional<Usuario> findById(Long id);
    Usuario save(Usuario usuario);
    void deleteById(Integer id);

    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    Optional<Usuario> findByEmail(String email);
    
}


/*Propuestas a ver:
    - updates
    - otros deletes
    - consulta de las notas asociadas a ese usuario
    - consulta combinada de las materias asociadas al usuario
*/