package com.apuntar.apuntarservidor.infraestructura.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.dtos.NivelDTO;
import com.apuntar.apuntarservidor.aplicacion.servicios.NivelService;
import com.apuntar.apuntarservidor.dominio.modelos.Nivel;

@RestController
@RequestMapping("/niveles")
public class NivelController {
    
    @Autowired
    private NivelService nivelService;

    @GetMapping
    public ResponseEntity<List<NivelDTO>> getAllNiveles(){
        List<NivelDTO> dtos = nivelService.obtenerTodosLosNiveles()
                .stream()
                .map(n -> new NivelDTO(n.getId(), n.getDescripcion()))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<NivelDTO> getPorId(@PathVariable Integer id){
        return nivelService.obtenerPorId(id)
                .map(n -> new NivelDTO(n.getId(), n.getDescripcion()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/descripcion/{descripcion}")
    public ResponseEntity<Nivel> buscarPorDescripcion(@PathVariable Integer descripcion){
        return nivelService.obtenerPorDescripcion(descripcion)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
