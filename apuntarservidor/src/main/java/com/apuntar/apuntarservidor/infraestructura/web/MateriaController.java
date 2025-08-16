package com.apuntar.apuntarservidor.infraestructura.web;

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

import com.apuntar.apuntarservidor.aplicacion.servicios.MateriaService;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {
    
    @Autowired
    private MateriaService materiaService;

    @GetMapping
    public ResponseEntity<List<Materia>> getAllMaterias(){
        return ResponseEntity.ok(materiaService.obtenerTodasLasMaterias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> getMateriaPorId(@PathVariable Long id){
        return materiaService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Materia> createMateria(@RequestBody Materia materia){
        return ResponseEntity.status(201).body(materiaService.persistirMateria(materia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> updateMateria(@PathVariable Long id, @RequestBody Materia materiaActualizada){
        materiaActualizada.setId(id);
        return ResponseEntity.ok(materiaService.persistirMateria(materiaActualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMateria(@PathVariable Long id){
        materiaService.eliminarMateria(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Materia> buscarPorNombre(@PathVariable String nombre){
        return materiaService.obtenerPorNombre(nombre)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nivel/{nivel}")
    public ResponseEntity<Materia> buscarPorNivel(@PathVariable String nivel){
        return materiaService.obtenerPorNivel(nivel)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nivelAcademico/{nivelAcademico}")
    public ResponseEntity<Materia> buscarPorNivelAcademico(@PathVariable String nivelAcademico){
        return materiaService.obtenerPorNivelAcademico(nivelAcademico)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
