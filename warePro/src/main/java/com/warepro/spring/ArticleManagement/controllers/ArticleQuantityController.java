package com.warepro.spring.ArticleManagement.controllers;

import com.warepro.spring.ArticleManagement.domain.ArticleEntity;
import com.warepro.spring.ArticleManagement.exceptions.articleExceptions.ArticleNotFoundException;
import com.warepro.spring.ArticleManagement.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@CrossOrigin
@RestController
@RequestMapping("/api/articles/manageArticlesQuantity")
public class ArticleQuantityController {
    // this controller will manage the quantity of the articles

    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleQuantityController(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;}

    // increment the quantity by a certain value
    @PostMapping("/increment/{code}")
    public ResponseEntity<?> incrementQuantity(@RequestParam(required = false) BigInteger quantity,
                                               @PathVariable("code") String code){

        ArticleEntity article = articleRepository.getArticleEntityByCode(code);
        if(article == null){
            throw new ArticleNotFoundException(code);}

        article.incrementQuantity(quantity == null ? new BigInteger("1") : quantity);
        this.articleRepository.save(article);
        return ResponseEntity.ok("the requested quantity was successfully added");
    }

    // decrement the quantity if it's zero send error and stop the operation
    @PostMapping("/decrement/{code}")
    public ResponseEntity<?> decrementQuantity(@RequestParam(required = false) BigInteger quantity,
                                               @PathVariable("code") String code){

        ArticleEntity article = articleRepository.getArticleEntityByCode(code);
        if(article == null){
            throw new ArticleNotFoundException(code);}

        boolean isDecremented = article.decrementQuantity(quantity == null ? new BigInteger("1") : quantity);
        if(isDecremented){
            articleRepository.save(article);
            return ResponseEntity.ok("the requested quantity was decremented");
        } else {
            return ResponseEntity.unprocessableEntity().body("the quantity to subtract is greater than the current quantity");
        }
    }
}
