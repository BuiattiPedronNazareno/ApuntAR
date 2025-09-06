package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.MateriaRepositoryPort;
import com.apuntar.apuntarservidor.aplicacion.puertos.NotaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.excepciones.MateriaDuplicadaException;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;
import com.apuntar.apuntarservidor.dominio.servicios.MateriaDomainService;

import jakarta.transaction.Transactional;

@Service
public class MateriaService {
    
    @Autowired
    private MateriaRepositoryPort materiaRepository;

    @Autowired
    private NotaRepositoryPort notaRepository;

    private final MateriaDomainService materiaDomainService = new MateriaDomainService();

    public List<Materia> obtenerTodasLasMaterias(){
        return materiaRepository.findAll();
    }

    @Transactional
    public void eliminarMateria(Integer id) {
        notaRepository.deleteByMateria_Id(id);
        materiaRepository.deleteById(id);
    }

    public Optional<Materia> obtenerPorId(Integer id){
        return materiaRepository.findById(id);
    }

    public Materia persistirMateria(Materia materia){
        materiaDomainService.validarCamposObligatorios(materia);
        if (materiaRepository.existsByNombre(materia.getNombre())) {
            throw new MateriaDuplicadaException("El nombre de la materia ya está registrado");
        }
        return materiaRepository.save(materia);
    }

    public Optional<Materia> obtenerPorNombre(String nombre){
        return materiaRepository.findByNombre(nombre);
    }

    public List<Materia> obtenerPorNivel(Integer nivel){
        return materiaRepository.findByNivel(nivel);
    }

    public List<Materia> obtenerPorNivelAcademico(String nivelAcademico){
        return materiaRepository.findByNivelAcademico(nivelAcademico);
    }

}
