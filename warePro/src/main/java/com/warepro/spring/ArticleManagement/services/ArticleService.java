package com.warepro.spring.ArticleManagement.services;

import com.warepro.spring.ArticleManagement.domain.ArticleEntity;
import com.warepro.spring.ArticleManagement.exceptions.articleExceptions.ArticleNotFoundException;
import com.warepro.spring.ArticleManagement.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ArticleService {


    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    public void incrementQuantityOfArticle(String id, BigDecimal incrementBy){

        ArticleEntity article = articleRepository.findById(id).orElseThrow(()->new ArticleNotFoundException(id));

        if(article != null) {
            article.incrementQuantity(incrementBy.toBigInteger());
        }

    }

}
