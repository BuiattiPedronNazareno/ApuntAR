package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.NivelAcademicoRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.NivelAcademico;

@Service
public class NivelAcademicoService {
    
    @Autowired
    private NivelAcademicoRepositoryPort nivelAcademicoRepository;

    public List<NivelAcademico> obtenerTodosLosNivelesAcademicos(){
        return nivelAcademicoRepository.findAll();
    }

    public Optional<NivelAcademico> obtenerPorId(Long id){
        return nivelAcademicoRepository.findById(id);
    }

    public Optional<NivelAcademico> obtenerPorDescripcion(String descripcion){
        return nivelAcademicoRepository.findByDescripcion(descripcion);
    }

}
