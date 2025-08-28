package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apuntar.apuntarservidor.aplicacion.puertos.NotaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Nota;
import com.apuntar.apuntarservidor.dominio.servicios.NotaDomainService;

@Service
public class NotaService {

    @Autowired
    private NotaRepositoryPort notaRepository;

    private final NotaDomainService notaDomainService = new NotaDomainService();

    @Transactional(readOnly = true)
    public List<Nota> obtenerTodasLasNotas(){
        return notaRepository.findAll(); // sesión abierta durante la carga
    }

    public Optional<Nota> obtenerPorId(Integer id){
        return notaRepository.findById(id);
    }

    public Nota persistirNota(Nota nota){
        notaDomainService.validarCamposObligatorios(nota);
        if (notaRepository.existsByTitulo(nota.getTitulo())){
            throw new RuntimeException("El título ya está registrado");
        }
        return notaRepository.save(nota);
    }

    public void eliminarNota(Integer id){
        notaRepository.deleteById(id);
    }

    public List<Nota> buscarPorPrioridad(String prioridad){
        return notaRepository.findByPrioridad(prioridad);
    }

    public List<Nota> buscarPorMateriaId(Integer id){
        return notaRepository.findByMateria_Id(id);
    }

    public List<Nota> buscarPorFechaCreacion(LocalDate fechaCreacion){
        return notaRepository.findByFechaCreacion(fechaCreacion);
    }

    public List<Nota> buscarPorTitulo(String titulo){
        return notaRepository.findByTitulo(titulo);
    }
    
}
