package com.apuntar.apuntarservidor.infraestructura.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.servicios.NivelAcademicoService;
import com.apuntar.apuntarservidor.dominio.modelos.NivelAcademico;

@RestController
@RequestMapping("/api/NivelAcademicos")
public class NivelAcademicoController {
    
    @Autowired
    private NivelAcademicoService nivelAcademicoService;

    @GetMapping
    public ResponseEntity<List<NivelAcademico>> getAllNivelesAcademicos(){
        return ResponseEntity.ok(nivelAcademicoService.obtenerTodosLosNivelesAcademicos());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<NivelAcademico> getUsuarioById(@PathVariable Long id){
        return nivelAcademicoService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/descripcion/{descripcion}")
    public ResponseEntity<NivelAcademico> getUsuarioByDescripcion(@PathVariable String descripcion){
        return nivelAcademicoService.obtenerPorDescripcion(descripcion)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
