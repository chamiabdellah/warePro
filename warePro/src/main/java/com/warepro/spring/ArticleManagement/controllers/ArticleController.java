package com.warepro.spring.ArticleManagement.controllers;

import com.warepro.spring.ArticleManagement.domain.ArticleEntity;
import com.warepro.spring.ArticleManagement.exceptions.articleExceptions.ArticleNotFoundException;
import com.warepro.spring.ArticleManagement.exceptions.validationErrors.ValidationErrorBuilder;
import com.warepro.spring.ArticleManagement.repository.ArticleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/articles/manageArticles")
public class ArticleController {

    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleController(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    @GetMapping
    public ResponseEntity<Iterable<ArticleEntity>> getAllArticles(){
        // return the complete content without any validation !!!!!!

        List<ArticleEntity> allArticles = articleRepository.findArticleEntitiesByEndOfUseDateIsNull();

        return ResponseEntity.ok(allArticles);
    }

    @GetMapping("/article/{id}")
    public ResponseEntity<ArticleEntity> getArticleById(@PathVariable String id){
        // Manage the case of notFound Article.

        ArticleEntity article = articleRepository.findById(id).orElseThrow(
                () -> new ArticleNotFoundException(id));

        return ResponseEntity.ok(article);
    }

    @GetMapping("/article")
    public ResponseEntity<ArticleEntity> getArticleByCode(@RequestParam(required = false) String code){
        ArticleEntity article = articleRepository.getArticleEntityByCode(code);
        if(article == null){
            throw new ArticleNotFoundException(code);}

        return ResponseEntity.ok(article);
    }

    // TODO : the methode to GET a set of articles (return articles by chunks)

    @PutMapping("/add")
    public ResponseEntity<?> addArticle(@RequestBody @Valid ArticleEntity article,
                                                    Errors errors){
        if(errors.hasErrors()){
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }

        // make sure that the code of the article is unique
        if(articleRepository.existsArticleEntityByCode(article.getCode())){
            ArticleEntity existingArticle = this.articleRepository.getArticleEntityByCode(article.getCode());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(existingArticle);
        }

        ArticleEntity createdArticle = articleRepository.save(article);
        // TODO : correct the returned path after the execution
        URI location = ServletUriComponentsBuilder.fromCurrentServletMapping().path("/{id}")
                .buildAndExpand(createdArticle.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/modify")
    public ResponseEntity<?> modifyArticle(@RequestBody @Valid ArticleEntity article, Errors errors){

        if(errors.hasErrors()){
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));}

        // check that this article exist
        ArticleEntity existingArticle = articleRepository.findById(article.getId()).orElseThrow(()->
                new ArticleNotFoundException(article.getId()));

        // if the code changed => check that there is no other article with the same Code.
        if(!article.getCode().equals(existingArticle.getCode())){
            boolean codeExists = articleRepository.existsArticleEntityByCode(article.getCode());
            if(codeExists){
                return ResponseEntity.status(HttpStatus.CONFLICT).body(existingArticle);
            }
        }

        articleRepository.save(article);
        // TODO : correct the returned path after the execution
        URI location = ServletUriComponentsBuilder.fromCurrentServletMapping().path("/{id}")
                .buildAndExpand(article.getId()).toUri();
        return ResponseEntity.ok().header("location",location.toString()).build();

    }

    // the methode to DELETE an article by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ArticleEntity> deleteArticle(@PathVariable String id){
        ArticleEntity article = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));

        article.delete();
        articleRepository.save(article);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/cancelDeletion/{id}")
    public ResponseEntity<ArticleEntity> cancelDeletionArticle(@PathVariable String id){
        ArticleEntity article = articleRepository.findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));

        article.setEndOfUseDate(null);
        articleRepository.save(article);
        return ResponseEntity.ok().build();
    }

}
