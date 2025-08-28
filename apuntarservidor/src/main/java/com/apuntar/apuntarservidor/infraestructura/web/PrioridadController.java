package com.apuntar.apuntarservidor.infraestructura.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.dtos.PrioridadDTO;
import com.apuntar.apuntarservidor.aplicacion.servicios.PrioridadService;
import com.apuntar.apuntarservidor.dominio.modelos.Prioridad;

@RestController
@RequestMapping("/prioridades")
public class PrioridadController {
    
    @Autowired
    private PrioridadService prioridadService;

    @GetMapping
    public ResponseEntity<List<PrioridadDTO>> getAllPrioridades(){
        List<PrioridadDTO> dtos = prioridadService.obtenerTodasLasPrioridades()
                .stream()
                .map(p -> new PrioridadDTO(p.getId(), p.getDescripcion()))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<PrioridadDTO> getPorId(@PathVariable Integer id){
        return prioridadService.obtenerPorId(id)
                .map(p -> new PrioridadDTO(p.getId(), p.getDescripcion()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/descripcion/{descripcion}")
    public ResponseEntity<Prioridad> buscarPorDescripcion(@PathVariable String descripcion){
        return prioridadService.obtenerPorDescripcion(descripcion)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
