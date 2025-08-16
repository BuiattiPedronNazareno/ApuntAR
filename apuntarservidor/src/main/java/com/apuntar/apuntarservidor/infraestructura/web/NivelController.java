package com.apuntar.apuntarservidor.infraestructura.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.servicios.NivelService;
import com.apuntar.apuntarservidor.dominio.modelos.Nivel;

@RestController
@RequestMapping("/api/niveles")
public class NivelController {
    
    @Autowired
    private NivelService nivelService;

    @GetMapping
    public ResponseEntity<List<Nivel>> getAllNiveles(){
        return ResponseEntity.ok(nivelService.obtenerTodosLosNiveles());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Nivel> getUsuarioById(@PathVariable Long id){
        return nivelService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/descripcion/{descripcion}")
    public ResponseEntity<Nivel> getUsuarioByDescripcion(@PathVariable Integer descripcion){
        return nivelService.obtenerPorDescripcion(descripcion)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
