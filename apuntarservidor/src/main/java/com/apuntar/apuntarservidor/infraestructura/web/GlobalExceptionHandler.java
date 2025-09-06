package com.apuntar.apuntarservidor.infraestructura.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.apuntar.apuntarservidor.dominio.excepciones.MateriaDuplicadaException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MateriaDuplicadaException.class)
    public ResponseEntity<Map<String, Object>> handleMateriaDuplicada(MateriaDuplicadaException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", ex.getMessage());
        response.put("codigo", "MATERIA_DUPLICADA");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

}
