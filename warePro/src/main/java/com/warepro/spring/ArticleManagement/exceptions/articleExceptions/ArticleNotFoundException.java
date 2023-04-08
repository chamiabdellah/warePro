package com.warepro.spring.ArticleManagement.exceptions.articleExceptions;

public class ArticleNotFoundException extends RuntimeException {

    public ArticleNotFoundException(String id){
        super("could not find Article with the id : "+ id);}

}
