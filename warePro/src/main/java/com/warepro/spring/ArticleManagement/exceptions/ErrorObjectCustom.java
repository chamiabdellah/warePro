package com.warepro.spring.ArticleManagement.exceptions;

public class ErrorObjectCustom {

    private String errorMessage;

    ErrorObjectCustom(String errorMessage){
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage){
        this.errorMessage = errorMessage;
    }
}
