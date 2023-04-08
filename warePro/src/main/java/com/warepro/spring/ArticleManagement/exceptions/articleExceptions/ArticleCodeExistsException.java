package com.warepro.spring.ArticleManagement.exceptions.articleExceptions;

public class ArticleCodeExistsException extends  RuntimeException{



    public ArticleCodeExistsException(String code){

        super("the article "+ code + " already exists");
    }
}
