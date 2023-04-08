import React  from 'react';
import useNavigateCustom from "../../../Hooks/useNavigateCustom";

export default function PreviousPageButton() {

    return(
        <button onClick={useNavigateCustom(-1)}>
            Previous
        </button>
    );
}