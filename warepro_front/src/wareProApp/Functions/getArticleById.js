import {useState} from "react";


export default async function getArticleById(id){

    const url = "http://localhost:8080/api/articles/manageArticles/article/"+id;

    let data = '';

    const response = await  fetch(url);
    if(response.status == 200){
        data = await response.json();
    } else {
        data = null;
    }

    return data;
}