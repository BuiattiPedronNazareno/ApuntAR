package com.apuntar.apuntarservidor.infraestructura.web;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.servicios.NotaService;
import com.apuntar.apuntarservidor.dominio.modelos.Nota;

@RestController
@RequestMapping("/api/notas")
public class NotaController {
    
    @Autowired
    private NotaService notaService;

    @GetMapping
    public ResponseEntity<List<Nota>> getAllNotas(){
        return ResponseEntity.ok(notaService.obtenerTodasLasNotas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable Long id){
        return notaService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota){
        return ResponseEntity.status(201).body(notaService.persistirNota(nota));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> updateNota(@PathVariable Long id, @RequestBody Nota notaActualizada){
        notaActualizada.setId(id);
        return ResponseEntity.ok(notaService.persistirNota(notaActualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id){
        notaService.eliminarNota(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/prioridad/{prioridad}")
    public ResponseEntity<Nota> buscarPorPrioridad(@PathVariable String prioridad){
        return notaService.buscarPorPrioridad(prioridad)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<Nota> buscarPorTitulo(@PathVariable String titulo){
        return notaService.buscarPorTitulo(titulo)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Nota> buscarPorUsuarioId(@PathVariable Long usuarioId){
        return notaService.buscarPorUsuarioId(usuarioId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/materia/{materiaId}")
    public ResponseEntity<Nota> buscarPorMateriaId(@PathVariable Long materiaId){
        return notaService.buscarPorMateriaId(materiaId)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/fechaCreacion/{fechaCreacion}")
    public ResponseEntity<Nota> buscarPorFechaCreacion(@PathVariable LocalDate fechaCreacion){
        return notaService.buscarPorFechaCreacion(fechaCreacion)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
