package com.warepro.spring.ArticleManagement.exceptions;

import com.warepro.spring.ArticleManagement.exceptions.articleExceptions.ArticleCodeExistsException;
import com.warepro.spring.ArticleManagement.exceptions.articleExceptions.ArticleNotFoundException;
import com.warepro.spring.ArticleManagement.exceptions.articleExceptions.InvalidArticleException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ControllerExceptionsHandler {

    @ResponseBody
    @ExceptionHandler(ArticleNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorObjectCustom ArticleNotFoundException(ArticleNotFoundException ex){
        return new ErrorObjectCustom(ex.getMessage());
    }
    @ResponseBody
    @ExceptionHandler(InvalidArticleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public List<ObjectError> InvalidArticleException(InvalidArticleException ex){
        return ex.getErrorsCustom().getAllErrors();
    }
    @ResponseBody
    @ExceptionHandler(ArticleCodeExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorObjectCustom ArticleCodeExistsException(ArticleCodeExistsException ex){
        return new ErrorObjectCustom(ex.getMessage());
    }

}
