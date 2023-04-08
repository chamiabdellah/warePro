import React, {useEffect, useMemo, useState} from "react";

export default function TestUseMemo(){

    // useMomo memorize a value until a dependency is updated
    const [counter, setCounter] = useState(0);
    const [updateCounter, setUpdateCounter] = useState(false);

    // trying to simulate useMemo using useEffect ==> fail;
    //var foo;

    // replacing the useMemo with useState + useEffect
    // => works BUT : we do two renders, one for the useEffect with null
    //                and the second for useState which shows the new value.
    const [fooState, setFooState] = useState(0);

    const myValue = useMemo(()=>{
        if(updateCounter){
            return counter;
        }
        return null;
    },[updateCounter, counter]);

    useEffect(()=>{
        //foo = counter;
       setFooState(counter);
    },[updateCounter])

    return(
        <>
            <div onClick={()=>{setCounter(counter+1)}}>{counter}</div>
            <div>{myValue}</div>
            <button onClick={()=>{setUpdateCounter(!updateCounter)}} >update</button>
            <div>{fooState}</div>
        </>
    );
}