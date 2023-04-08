import React from 'react';
import InventoryGrid from "../../Components/InventoryGrid/InventoryGrid";
import useNavigateCustom from "../../Hooks/useNavigateCustom";

export default function InventoryAddArticle() {

    return(
        <div className="inventoryAddArticle" onClick={useNavigateCustom("/addArticle")}>
            <button>
                ADD article
            </button>
        </div>
    );
}