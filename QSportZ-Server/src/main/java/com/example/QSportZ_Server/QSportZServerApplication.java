package com.example.QSportZ_Server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class QSportZServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(QSportZServerApplication.class, args);
	}

}
