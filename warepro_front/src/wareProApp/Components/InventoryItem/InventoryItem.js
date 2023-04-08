import React, {useState} from 'react';
import './InventoryItem.css';
import useNavigateCustom from "../../Hooks/useNavigateCustom";
import {useNavigate} from "react-router-dom";


export default function InventoryItem({article}) {

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const navigateToModify = useNavigateCustom("/addArticle?id="+article.id);
    const navigate = useNavigate();
    const navigateToDuplicate = () => {
        article.id = null;
        article.code = null;
        return navigate("/addArticle",{state:article});
    };

    const deleteArticle = async (id) => {

        let targetURL = 'http://localhost:8080/api/articles/manageArticles/delete/' + id;
        await setIsLoading(true);
        let requestOptions = {
            method:'DELETE',
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        };

        if(isDeleted){
            targetURL = 'http://localhost:8080/api/articles/manageArticles/cancelDeletion/' + id;
            setIsLoading(false);
            setIsDeleted(false);
            requestOptions = {
                method:'POST',
                headers: {'Content-Type': 'application/json','Accept': 'application/json'}
            };
        }

        console.log("target URL : "+targetURL);
        console.log("request options : " + requestOptions);
        const response = await fetch(targetURL, requestOptions);
        if(response.status === 200){
            setIsLoading(false);
        } else {
            console.log("an unexpected error happened at the deletion of the article");
        }

        setIsDeleted(()=> !isDeleted);
    };

    const stopEventPropagation = (e)=> {
        e.stopPropagation();
    };


    return(
        <div className="inventoryItem" onClick={useNavigateCustom("/getarticle?id="+ article.id)}>
            {!isLoading && !isDeleted && <div>
                <ul>
                    <li>code : {article.code}</li>
                    <li>article name : {article.articleName}</li>
                    <li>available Quantity : {article.quantity}</li>
                    <li>price : {article.price}</li>
                </ul>
            </div>}
            <div onClick={stopEventPropagation}>
                <button onClick={()=> {
                    void deleteArticle(article.id);}}>
                    {!isDeleted ? "delete" : "cancel"}</button>
                {!isDeleted && !isLoading &&
                    <>
                        <button onClick={navigateToModify}>modify</button>
                        <button onClick={navigateToDuplicate}>duplicate</button>
                    </>
                }
            </div>
            <div>
                {isDeleted && article.articleName}
            </div>
        </div>
    );
}