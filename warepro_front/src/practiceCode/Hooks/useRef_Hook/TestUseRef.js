import React, {useEffect, useRef, useState} from 'react';

export default function TestUseRef(){

    // count the number of re-renders using useRef hook:

    const counter = useRef(0);
    //var renderCountVar = 0;
    const [state,setState] = useState(0);
    //const [renderCounter, setRenderCounter] = useState(0);

    useEffect(()=>{
        counter.current = counter.current + 1;
        console.log(counter.current);
        // we can't count the renders of the page using normal variables => the variable will be initialized each render
        // renderCountVar += 1;
        // console.log(renderCountVar);
    },);

    return(
        <>
            <div onClick={()=>{setState(state+1);}}>click me !!!</div>
        </>
    );
}