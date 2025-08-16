package com.apuntar.apuntarservidor.infraestructura.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.servicios.PrioridadService;
import com.apuntar.apuntarservidor.dominio.modelos.Prioridad;

@RestController
@RequestMapping("/api/prioridades")
public class PrioridadController {
    
    @Autowired
    private PrioridadService prioridadService;

    @GetMapping
    public ResponseEntity<List<Prioridad>> getAllPrioridades(){
        return ResponseEntity.ok(prioridadService.obtenerTodasLasPrioridades());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Prioridad> getUsuarioById(@PathVariable Long id){
        return prioridadService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/descripcion/{descripcion}")
    public ResponseEntity<Prioridad> getUsuarioByDescripcion(@PathVariable String descripcion){
        return prioridadService.obtenerPorDescripcion(descripcion)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
