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
import com.apuntar.apuntarservidor.infraestructura.exception.TituloDuplicadoException;

@Service
public class NotaService {

    @Autowired
    private NotaRepositoryPort notaRepository;

    private final NotaDomainService notaDomainService = new NotaDomainService();

    @Transactional(readOnly = true)
    public List<Nota> obtenerTodasLasNotas(){
        return notaRepository.findAll(); 
    }

    public Optional<Nota> obtenerPorId(Integer id){
        return notaRepository.findById(id);
    }

    public Nota persistirNota(Nota nota){
    notaDomainService.validarCamposObligatorios(nota);

    if (nota.getMateria() != null) {
        boolean tituloDuplicado;
        if (nota.getId() != null) {
            tituloDuplicado = notaRepository.existsByTituloAndMateria_IdAndIdNot(
                nota.getTitulo(),
                nota.getMateria().getId(),
                nota.getId()
            );
        } else {
            tituloDuplicado = notaRepository.existsByTituloAndMateria_Id(
                nota.getTitulo(),
                nota.getMateria().getId()
            );
        }

        if (tituloDuplicado) {
            throw new TituloDuplicadoException("EL_TITULO_YA_EXISTE_PARA_ESTA_MATERIA");
        }
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

    public boolean existePorTitulo(String titulo, Integer materiaID, Integer notaId) {
        if (materiaID != null) {
            if (notaId != null) {
                return notaRepository.existsByTituloAndMateria_IdAndIdNot(titulo, materiaID, notaId);
            } else {
                return notaRepository.existsByTituloAndMateria_Id(titulo, materiaID);
            }
        } else {
            if (notaId != null) {
                return notaRepository.existsByTituloAndIdNot(titulo, notaId);
            } else {
                return notaRepository.existsByTitulo(titulo);
            }
        }
    }

}
