import React from "react";
import {useNavigate} from "react-router-dom";

export default function ArticleDontExistNotification({props}){

    let ARTICLE_FORM_INITIAL_STATE = {
        code:'',
        articleName : '',
        price : '',
        quantity : ''
    };

    const navigate = useNavigate();

    const addArticle = () => {
        ARTICLE_FORM_INITIAL_STATE.code = props;
        navigate("/addArticle", {state:ARTICLE_FORM_INITIAL_STATE});
    };

    return(
        <>
            <div>
                <span>the scanned article doesn't exist</span>
                <span>
                    <button onClick={addArticle}>Add the scanned article</button>
                </span>
            </div>
        </>
    )
}