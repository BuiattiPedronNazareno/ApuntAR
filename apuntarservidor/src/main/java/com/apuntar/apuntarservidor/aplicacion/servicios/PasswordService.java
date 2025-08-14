package com.apuntar.apuntarservidor.aplicacion.servicios;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {
    
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String hashPassword(String contrasenia){
        return encoder.encode(contrasenia);
    }

    public boolean verifyPassword(String contrasenia, String contraseniaHashed){
        return encoder.matches(contrasenia, contraseniaHashed);
    }

}
