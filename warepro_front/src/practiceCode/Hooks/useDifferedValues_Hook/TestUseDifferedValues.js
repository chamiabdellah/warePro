import React, {useDeferredValue, useState} from "react";
import ResultComponent from "./ResultComponent";

export default function TestUseDifferedValues(){

    const [name,setName] = useState("");
    const deferredName = useDeferredValue(name);

    function handleChange(event){
        setName(event.target.value);
    }

    return(
        <>
            <input type="text" value={name} onChange={handleChange}/>
            <ResultComponent name={deferredName} />
        </>
    );
}