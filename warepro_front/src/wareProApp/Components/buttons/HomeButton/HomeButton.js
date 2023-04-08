import React  from 'react';
import './HomeButton.css';
import useNavigateCustom from "../../../Hooks/useNavigateCustom";

export default function HomeButton() {

    return(
        <button onClick={useNavigateCustom('/')}>
            Home
        </button>
    );
}