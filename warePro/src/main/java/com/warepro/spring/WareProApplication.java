package com.warepro.spring;

import com.warepro.spring.ArticleManagement.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WareProApplication {

	@Autowired
	public ArticleRepository repo;

	public static void main(String[] args) {
		SpringApplication.run(WareProApplication.class, args);
	}

}
