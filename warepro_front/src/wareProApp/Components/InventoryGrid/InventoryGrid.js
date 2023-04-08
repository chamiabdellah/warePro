import React, {useEffect, useState} from 'react';
import InventoryItem from "../InventoryItem/InventoryItem";
import useData from "../../Hooks/useData";

export default function InventoryGrid() {

    const [allArticles, isLoading, errors] = useData("http://localhost:8080/api/articles/manageArticles");

    return(
        <div className="inventoryGrid">
            { isLoading ?
                <center>Loading..</center>
                :
                allArticles.map((arti) => <InventoryItem key={arti.id} article={arti}/>)
            }
        </div>
    );
}