package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.UsuarioRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Usuario;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepositoryPort usuarioRepository;

    @Autowired
    private PasswordService passwordService;

    public List<Usuario> obtenerTodosLosUsuarios(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Long id){
        return usuarioRepository.findById(id);
    }

    public Usuario persistirUsuario(Usuario usuario){
        usuario.setContrasenia(passwordService.hashPassword(usuario.getContrasenia()));
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id){
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> obtenerPorEmail(String email){
        return usuarioRepository.findByEmail(email);
    }

    public Optional<Usuario> obtenerPorNombreUsuario(String nombreUsuario){
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }

}
