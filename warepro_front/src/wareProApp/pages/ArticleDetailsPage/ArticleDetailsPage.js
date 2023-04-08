import React, {useState} from 'react';
import useData from "../../Hooks/useData";
import { useNavigate, useSearchParams} from "react-router-dom";
import ArticleInfoDetails from "../../Components/ArticleInfoDetails/ArticleInfoDetails";
import useActionOnCodeBare from "../../Hooks/useActionOnCodeBare";
import ArticleDontExistNotification
    from "../../Components/Notifications/ArticleDontExistNotification/ArticleDontExistNotification";


export default function ArticleDetailsPage() {

    const [params] = useSearchParams();
    const articleId = params.get("id");
    const navigate = useNavigate();

    const [article,isLoading,errors] = useData("http://localhost:8080/api/articles/manageArticles/article/"+articleId,articleId);

    const moveToNextArticle = (article)=>{
        navigate("/getarticle?id="+ article.id);
    }

    const [notFoundCode, setNotFoundCode] = useState("");
    useActionOnCodeBare(moveToNextArticle, setNotFoundCode);

    if(isLoading){
        return(
          <center>
              Loading...
          </center>
        );
    }

    return(
        <div className="articleDetailsPage">
            <ArticleInfoDetails article={article}/>
            {notFoundCode !== "" && <ArticleDontExistNotification props={notFoundCode}/>}
        </div>
    );
}