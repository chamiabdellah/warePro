import React, {useContext} from "react";
import {UserContext} from "../rootPage";

export default function DecrementCounter(){

    const [counterValue, setCounterValue] = useContext(UserContext);

    const handleDecremental = ()=>{
        setCounterValue(prev => prev - 1 );
    };

    return(
        <>
            <button onClick={handleDecremental}>-</button>
        </>
    );
}