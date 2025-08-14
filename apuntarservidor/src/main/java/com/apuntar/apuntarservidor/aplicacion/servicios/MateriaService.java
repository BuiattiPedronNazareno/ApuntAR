package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.MateriaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;

@Service
public class MateriaService {
    
    @Autowired
    private MateriaRepositoryPort materiaRepository;

    public List<Materia> obtenerTodasLasMaterias(){
        return materiaRepository.findAll();
    }

    public Optional<Materia> obtenerPorId(Long id){
        return materiaRepository.findById(id);
    }

    public Materia persistirMateria(Materia materia){
        return materiaRepository.save(materia);
    }

    public void eliminarMateria(Long id){
        materiaRepository.deleteById(id);
    }

    public Optional<Materia> encontrarPorNombre(String nombre){
        return materiaRepository.findByNombre(nombre);
    }

    public Optional<Materia> encontrarPorNivel(String nivel){
        return materiaRepository.findByNivel(nivel);
    }

    public Optional<Materia> encontrarPorNivelAcademico(String nivelAcademico){
        return materiaRepository.findByNivelAcademico(nivelAcademico);
    }

}
