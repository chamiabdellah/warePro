import React, {useCallback, useEffect, useState} from 'react';
import InventoryGrid from "../../Components/InventoryGrid/InventoryGrid";
import InventoryAddArticle from "../../Components/InventoryAddArticleButton/InventoryAddArticle";
import {useNavigate} from "react-router-dom";
import useActionOnCodeBare from "../../Hooks/useActionOnCodeBare";
import ArticleDontExistNotification
    from "../../Components/Notifications/ArticleDontExistNotification/ArticleDontExistNotification";

export default function InventoryPage() {

    const navigate = useNavigate();

    const navigateToArticleDetails = (scannedArticle) => {
        navigate("/getarticle?id="+ scannedArticle.id);
    };

    const [notFoundCode, setNotFoundCode] = useState("");
    useActionOnCodeBare(navigateToArticleDetails, setNotFoundCode);

    return(
        <div className="inventoryPage">
            <h1>List of articles</h1>
            <InventoryAddArticle/>
            {notFoundCode !== "" && <ArticleDontExistNotification props={notFoundCode}/>}
            <InventoryGrid/>
        </div>
    );
}