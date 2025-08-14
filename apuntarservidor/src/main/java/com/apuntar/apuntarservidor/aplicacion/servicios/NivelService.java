package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.NivelRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Nivel;

@Service
public class NivelService {
    
    @Autowired
    private NivelRepositoryPort nivelRepository;

    public List<Nivel> obtenerTodosLosNiveles(){
        return nivelRepository.findAll();
    }

    public Optional<Nivel> obtenerPorId(Long id){
        return nivelRepository.findById(id);
    }

    public Optional<Nivel> obtenerPorDescripcion(Integer descripcion){
        return nivelRepository.findByDescripcion(descripcion);
    }

}
