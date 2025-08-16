package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.MateriaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;
import com.apuntar.apuntarservidor.dominio.servicios.MateriaDomainService;

@Service
public class MateriaService {
    
    @Autowired
    private MateriaRepositoryPort materiaRepository;

    private final MateriaDomainService materiaDomainService = new MateriaDomainService();

    public List<Materia> obtenerTodasLasMaterias(){
        return materiaRepository.findAll();
    }

    public Optional<Materia> obtenerPorId(Long id){
        return materiaRepository.findById(id);
    }

    public Materia persistirMateria(Materia materia){
        materiaDomainService.validarCamposObligatorios(materia);
        if (materiaRepository.existsByNombre(materia.getNombre())) {
            throw new RuntimeException("El nombre de la materia ya está registrado");
        }
        return materiaRepository.save(materia);
    }

    public void eliminarMateria(Long id){
        materiaRepository.deleteById(id);
    }

    public Optional<Materia> obtenerPorNombre(String nombre){
        return materiaRepository.findByNombre(nombre);
    }

    public Optional<Materia> obtenerPorNivel(String nivel){
        return materiaRepository.findByNivel(nivel);
    }

    public Optional<Materia> obtenerPorNivelAcademico(String nivelAcademico){
        return materiaRepository.findByNivelAcademico(nivelAcademico);
    }

}
