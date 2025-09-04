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

import com.apuntar.apuntarservidor.aplicacion.dtos.MateriaDTO;
import com.apuntar.apuntarservidor.aplicacion.servicios.MateriaService;
import com.apuntar.apuntarservidor.dominio.modelos.Materia;

@RestController
@RequestMapping("/materias")
public class MateriaController {
    
    @Autowired
    private MateriaService materiaService;

    @GetMapping
    public ResponseEntity<List<MateriaDTO>> getAllMaterias() {
        List<Materia> materias = materiaService.obtenerTodasLasMaterias();
        List<MateriaDTO> materiasDTO = materias.stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(materiasDTO);
    }

    private MateriaDTO convertToDTO(Materia materia) {
        return new MateriaDTO(
                materia.getId(),
                materia.getNombre(),
                materia.getNivel(),
                materia.getNivelAcademico()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<MateriaDTO> getMateriaPorId(@PathVariable Integer id){
        return materiaService.obtenerPorId(id)
                .map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Materia> createMateria(@RequestBody Materia materia){
        return ResponseEntity.status(201).body(materiaService.persistirMateria(materia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> updateMateria(@PathVariable Integer id, @RequestBody Materia materiaActualizada){
        materiaActualizada.setId(id);
        return ResponseEntity.ok(materiaService.persistirMateria(materiaActualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMateria(@PathVariable Integer id) {
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
    public ResponseEntity<List<MateriaDTO>> buscarPorNivel(@PathVariable Integer nivel){
        List<MateriaDTO> dtos = materiaService.obtenerPorNivel(nivel)
                .stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/nivelAcademico/{nivelAcademico}")
    public ResponseEntity<List<MateriaDTO>> buscarPorNivelAcademico(@PathVariable String nivelAcademico){
        List<MateriaDTO> dtos = materiaService.obtenerPorNivelAcademico(nivelAcademico)
                .stream()
                .map(this::convertToDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

}
