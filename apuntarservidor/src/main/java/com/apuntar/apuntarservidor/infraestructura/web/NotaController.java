package com.apuntar.apuntarservidor.infraestructura.web;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.dtos.MateriaDTO;
import com.apuntar.apuntarservidor.aplicacion.dtos.NotaDTO;
import com.apuntar.apuntarservidor.aplicacion.servicios.NotaService;
import com.apuntar.apuntarservidor.dominio.modelos.Nota;



@RestController
@RequestMapping("/notas")
public class NotaController {
    
    @Autowired
    private NotaService notaService;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(NotaController.class);

    @GetMapping
    public ResponseEntity<List<NotaDTO>> getAllNotas(){

        List<Nota> notas = notaService.obtenerTodasLasNotas();
        logger.info("Cantidad de notas obtenidas: {}", notas.size());

        List<NotaDTO> notasDTO = notaService.obtenerTodasLasNotas()
                .stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(notasDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotaDTO> getNotaById(@PathVariable Integer id){
        return notaService.obtenerPorId(id)
                .map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private NotaDTO convertToDTO(Nota nota) {
        return new NotaDTO(
            nota.getId(),
            nota.getTitulo(),
            nota.getContenido(),
            nota.getPrioridad(),
            nota.getFechaCreacion(),
            nota.getMateria() != null
            ? new MateriaDTO(
                nota.getMateria().getId(),
                nota.getMateria().getNombre(),
                nota.getMateria().getNivel(),
                nota.getMateria().getNivelAcademico()
              )
            : null
        );
    }


    @PostMapping
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota){
        return ResponseEntity.status(201).body(notaService.persistirNota(nota));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> updateNota(@PathVariable Integer id, @RequestBody Nota notaActualizada){
        notaActualizada.setId(id);
        return ResponseEntity.ok(notaService.persistirNota(notaActualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Integer id){
        notaService.eliminarNota(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/prioridad/{prioridad}")
    public ResponseEntity<List<NotaDTO>> buscarPorPrioridad(@PathVariable String prioridad) {
        List<NotaDTO> dtos = notaService.buscarPorPrioridad(prioridad)
                .stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<List<NotaDTO>> buscarPorTitulo(@PathVariable String titulo) {
        List<NotaDTO> dtos = notaService.buscarPorTitulo(titulo)
                .stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/materia/{materiaId}")
    public ResponseEntity<List<NotaDTO>> buscarPorMateriaId(@PathVariable Integer materiaId) {
        List<NotaDTO> dtos = notaService.buscarPorMateriaId(materiaId)
                .stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/fechaCreacion/{fechaCreacion}")
    public ResponseEntity<List<NotaDTO>> buscarPorFechaCreacion(@PathVariable LocalDate fechaCreacion) {
        List<NotaDTO> dtos = notaService.buscarPorFechaCreacion(fechaCreacion)
                .stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/check-titulo")
    public boolean existePorTitulo(@RequestParam String titulo, @RequestParam(required = false) Integer materiaID, @RequestParam(required = false) Integer notaId ) {
        return notaService.existePorTitulo(titulo, materiaID, notaId);
    }
    
}
