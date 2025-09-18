package com.apuntar.apuntarservidor.infraestructura.web;

import java.io.File;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /*@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // habilita CORS en todos los endpoints
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }*/
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        
        String uploadsPath = "/app/uploads/";
        File uploadDir = new File(uploadsPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
            System.out.println("Directorio uploads creado: " + uploadsPath);
        }
        
        System.out.println("Configurando uploads en: " + uploadsPath);
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadsPath)
                .setCacheControl(CacheControl.noCache()); 

        registry.setOrder(1);

    }
}
