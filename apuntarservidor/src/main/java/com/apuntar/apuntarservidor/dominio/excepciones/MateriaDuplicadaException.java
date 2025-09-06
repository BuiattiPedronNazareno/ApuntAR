package com.apuntar.apuntarservidor.dominio.excepciones;

public class MateriaDuplicadaException extends RuntimeException {
    public MateriaDuplicadaException(String mensaje) {
        super(mensaje);
    }
}
