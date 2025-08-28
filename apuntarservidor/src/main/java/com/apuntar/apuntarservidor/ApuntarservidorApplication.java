package com.apuntar.apuntarservidor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(scanBasePackages = "com.apuntar.apuntarservidor")
public class ApuntarservidorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApuntarservidorApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedOrigins("http://localhost:3000") 
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
					.allowedHeaders("*")
					.allowCredentials(true)
					.maxAge(3600);  
			}
		};
	}

}
