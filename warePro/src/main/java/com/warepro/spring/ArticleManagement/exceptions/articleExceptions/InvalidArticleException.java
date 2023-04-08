package com.warepro.spring.ArticleManagement.exceptions.articleExceptions;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.Errors;

public class InvalidArticleException extends RuntimeException {

    private final Errors errors;

    public InvalidArticleException(Errors errors){
        super(errors.getAllErrors()
                .stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList().toString());
        this.errors = errors;
    }

    public Errors getErrorsCustom() {
        return errors;
    }
}
