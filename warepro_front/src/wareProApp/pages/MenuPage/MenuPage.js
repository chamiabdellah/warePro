import React, {useState} from "react";
import MenuGrid from "../../Components/MenuGrid/MenuGrid";
import useActionOnCodeBare from "../../Hooks/useActionOnCodeBare";
import {useNavigate} from "react-router-dom";
import ArticleDontExistNotification
    from "../../Components/Notifications/ArticleDontExistNotification/ArticleDontExistNotification";


export default function MenuPage() {

    const navigate = useNavigate();
    const moveToNextArticle = (article)=>{
        navigate("/sell?code="+ article.code);
    }

    const [notFoundCode, setNotFoundCode] = useState("");
    useActionOnCodeBare(moveToNextArticle, setNotFoundCode);

    return (
        <div className="MenuPage">
            {notFoundCode !== "" && <ArticleDontExistNotification props={notFoundCode}/>}
            <MenuGrid />
        </div>
    );
}