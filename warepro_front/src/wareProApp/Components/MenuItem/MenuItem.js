import React  from 'react';
import './MenuItem.css';
import {useNavigate} from "react-router-dom";
import useNavigateCustom from "../../Hooks/useNavigateCustom";

export default function MenuItem({props}) {
    console.log(props);

    return(
        <div className="menuItem" onClick={useNavigateCustom(props.destination)} >
            <div className="menuItemText" >{props.name}</div>
        </div>
    );
}