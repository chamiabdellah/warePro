import React from "react";
import {UserContext} from "../rootPage";

export default function CounterPublic(){

    const [counterValue,] = React.useContext(UserContext);

    return(
        <>
            <div>{counterValue}</div>
        </>
    );
}