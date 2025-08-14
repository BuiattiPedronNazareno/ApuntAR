package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.PrioridadRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Prioridad;

@Service
public class PrioridadService {
    
    @Autowired
    private PrioridadRepositoryPort prioridadRepository;

    public List<Prioridad> obtenerTodasLasPrioridades(){
        return prioridadRepository.findAll();
    }

    public Optional<Prioridad> obtenerPorId(Long id){
        return prioridadRepository.findById(id);
    }

    public Optional<Prioridad> obtenerPorDescripcion(String descripcion){
        return prioridadRepository.findByDescripcion(descripcion);
    }

}
