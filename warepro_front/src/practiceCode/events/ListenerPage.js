import React, {useEffect, useState} from 'react';


export default function ListenerPage(){

    const [showListener, setShowListener] = useState(true);

    return(
        <>
            <div onClick={()=>{setShowListener(!showListener)}}>delete the listener element</div>
            {showListener && <ListenerElement/>}
        </>
    )

}

function ListenerElement(){

    const  handleKeyDown = (e)=>{
        console.log(e);
    }

    useEffect(()=>{
        window.addEventListener("keydown", handleKeyDown);

        return ()=>{
            window.removeEventListener("keydown",handleKeyDown);
        }
    },[])


    return(
        <>
            <div>we are listening</div>
            <input/>
        </>
    );
}