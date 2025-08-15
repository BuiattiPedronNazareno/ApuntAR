package com.apuntar.apuntarservidor.aplicacion.servicios;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apuntar.apuntarservidor.aplicacion.puertos.NotaRepositoryPort;
import com.apuntar.apuntarservidor.dominio.modelos.Nota;
import com.apuntar.apuntarservidor.dominio.servicios.NotaDomainService;

@Service
public class NotaService {

    @Autowired
    private NotaRepositoryPort notaRepository;

    private final NotaDomainService notaDomainService = new NotaDomainService();

    public List<Nota> obtenerTodasLasNotas(){
        return notaRepository.findAll();
    }

    public Optional<Nota> obtenerPorId(Long id){
        return notaRepository.findById(id);
    }

    public Nota persistirNota(Nota nota){
        notaDomainService.validarCamposObligatorios(nota);
        if (notaRepository.existsByTitulo(nota.getTitulo())){
            throw new RuntimeException("El título ya está registrado");
        }
        return notaRepository.save(nota);
    }

    public void eliminarNota(Long id){
        notaRepository.deleteById(id);
    }

    public Optional<Nota> buscarPorPrioridad(String prioridad){
        return notaRepository.findByPrioridad(prioridad);
    }

    public Optional<Nota> buscarPorUsuarioId(Long id){
        return notaRepository.findByUsuarioId(id);
    }

    public Optional<Nota> buscarPorMateriaId(Long id){
        return notaRepository.findByMateriaId(id);
    }

    public Optional<Nota> buscarPorFechaCreacion(LocalDate fechaCreacion){
        return notaRepository.findByFechaCreacion(fechaCreacion);
    }

    public Optional<Nota> buscarPorTitulo(String titulo){
        return notaRepository.findByTitulo(titulo);
    }
    
}
