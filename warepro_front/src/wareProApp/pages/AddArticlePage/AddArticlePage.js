import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useLocation, useSearchParams} from "react-router-dom";
import getArticleById from "../../Functions/getArticleById";

export default function AddArticlePage() {
    const [params] = useSearchParams();
    const articleId = params.get("id");
    const passedArticle = useLocation();
    const [isLoading,setIsLoading] = useState(articleId != null);
    const [formState,setFormState] = useState(articleId == null ? "CREATE":"MODIFY");

    let article = useRef();

    let ARTICLE_FORM_INITIAL_STATE = {
        code:'',
        articleName : '',
        price : '',
        quantity : ''
    };

    const [articleForm,setArticleForm] = useState(passedArticle.state || ARTICLE_FORM_INITIAL_STATE);

    useEffect(()=>{

        async function getArticleByIdFunction () {
        if(articleId != null) {
            article.current = await getArticleById(articleId);
            if (article.current != null) {
                console.log(article.current);
                setArticleForm(article.current);
            }else{
                setFormState("CREATE");
            }
            setIsLoading(false);
        }};
        void getArticleByIdFunction();

    },[articleId]);


    function handleArticleCreation(event) {
        event.preventDefault();

        if(formState === "CREATE"){
            void addArticle();
        } else {
            void modifyArticle();
        }
    }

    function handleChange(event) {
        setArticleForm({
            ...articleForm,
            [event.target.id] : event.target.value
        })
    }

    async function addArticle(){
        const requestOptions = {
            method:'PUT',
            headers: {'Content-Type': 'application/json','Accept': 'application/json'},
            body : JSON.stringify({
                id : articleForm.id,
                ...articleForm
            })
        };

        const response = await fetch("http://localhost:8080/api/articles/manageArticles/add", requestOptions);
        console.log("fe" +response)

        if(response.status === 201){
            console.log("the article was added to the database with success");
        } else if(response.status === 409){
            const existingArticle = await response.json();
            //  ask the user to start from the old object or to create a new one
            const userChoice = window.confirm("an article with the name <b>" + existingArticle.articleName + "</b> already exists.\n do you want to add that one again ?");
            if(userChoice){
                // if true => use the returned article
                existingArticle.endOfUseDate = null;
                setArticleForm(() => {return { ...existingArticle}});
            } else {
                // keep the typed article but in modify mode, and set the id from returned article
                articleForm.endOfUseDate = null;
                setArticleForm(() =>{return {id:existingArticle.id, ...articleForm}});
            }
            setFormState("MODIFY");
        } else{
            console.log(await response.json())
        }
    }

    async function modifyArticle(){
        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json','Accept': 'application/json'},
            body : JSON.stringify({
                id : articleId,
                ...articleForm})
        };
        console.log(requestOptions);
        const response = await fetch("http://localhost:8080/api/articles/manageArticles/modify", requestOptions);

        if(response.status === 200){
            console.log("the article was modified with success");
        }else{
            console.log(await response.json())
        }
    }

    return(
        <div className="addArticlePage">
            <center>
                <h1>Create a new Article</h1>

                { isLoading ? <center>Loading...</center>
                    : <form onSubmit={handleArticleCreation}>
                    <div>
                        <label htmlFor="code">Code</label>
                        <input required={true} type="text" id="code"
                               value={articleForm.code == null ? "" : articleForm.code} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="articleName">Article name</label>
                        <input required={true} type="text" id="articleName"
                               value={articleForm.articleName == null ? "" : articleForm.articleName}
                               onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price"
                               value={articleForm.price == null ? "" : articleForm.price} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity"
                               value={articleForm.quantity == null ? "" : articleForm.quantity}
                               onChange={handleChange}/>
                    </div>
                    <input type="submit" value={formState}/>
                </form>}

            </center>
        </div>
    );
}