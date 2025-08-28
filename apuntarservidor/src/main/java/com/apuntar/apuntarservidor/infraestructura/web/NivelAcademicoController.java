package com.apuntar.apuntarservidor.infraestructura.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apuntar.apuntarservidor.aplicacion.dtos.NivelAcademicoDTO;
import com.apuntar.apuntarservidor.aplicacion.servicios.NivelAcademicoService;
import com.apuntar.apuntarservidor.dominio.modelos.NivelAcademico;

@RestController
@RequestMapping("/nivelesacademicos")
public class NivelAcademicoController {
    
    @Autowired
    private NivelAcademicoService nivelAcademicoService;

    @GetMapping
    public ResponseEntity<List<NivelAcademicoDTO>> getAllNivelesAcademicos(){
        List<NivelAcademicoDTO> dtos = nivelAcademicoService.obtenerTodosLosNivelesAcademicos()
                .stream()
                .map(n -> new NivelAcademicoDTO(n.getId(), n.getDescripcion()))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<NivelAcademicoDTO> getPorId(@PathVariable Integer id){
        return nivelAcademicoService.obtenerPorId(id)
                .map(n -> new NivelAcademicoDTO(n.getId(), n.getDescripcion()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/descripcion/{descripcion}")
    public ResponseEntity<NivelAcademico> buscarPorDescripcion(@PathVariable String descripcion){
        return nivelAcademicoService.obtenerPorDescripcion(descripcion)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
