package com.apuntar.apuntarservidor.dominio.servicios;
import java.util.regex.Pattern;

import com.apuntar.apuntarservidor.aplicacion.puertos.UsuarioRepositoryPort;

public class UsuarioDomainService {

    private static final Pattern PATRON_EMAIL = 
        Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    private final UsuarioRepositoryPort usuarioRepository;

    public UsuarioDomainService(UsuarioRepositoryPort usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public void validarFormatoEmail(String email) {
        if (!PATRON_EMAIL.matcher(email).matches()) {
            throw new RuntimeException("Formato de email inválido");
        }
    }

    public void validarContraseniaSegura(String contrasenia) {
        if (contrasenia.length() < 8) {
            throw new RuntimeException("La contraseña debe tener al menos 8 caracteres");
        }
    }

    public void validarNombreUsuarioUnico(String nombreUsuario) {
        if (usuarioRepository.existsByNombreUsuario(nombreUsuario)) {
            throw new RuntimeException("Nombre de usuario no disponible");
        }
    }

    public void validarCamposObligatorios(com.apuntar.apuntarservidor.dominio.modelos.Usuario usuario) {
        if (usuario.getNombre() == null || usuario.getNombre().isEmpty()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        if (usuario.getApellido() == null || usuario.getApellido().isEmpty()) {
            throw new RuntimeException("El apellido es obligatorio");
        }
        if (usuario.getEmail() == null || usuario.getEmail().isEmpty()) {
            throw new RuntimeException("El email es obligatorio");
        }
        if (usuario.getNombreUsuario() == null || usuario.getNombreUsuario().isEmpty()){
            throw new RuntimeException("El nombre de usuario es obligatorio");
        }
    }

}