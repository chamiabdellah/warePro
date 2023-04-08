import React, {useDeferredValue, useMemo} from "react";

export default function ResultComponent({name}){

    const listName = [];
    const getHeavyComputation = (name)=>{

        for(let i=0; i<3; i++){
            for(let i=0; i<90000000; i++){
                listName.concat(i);
            }
        }
        return name;
    };

    const differedName = useDeferredValue(name);
    const computedValue = useMemo(()=>{
        return getHeavyComputation(differedName);
    },[differedName]);

    return(
        <>
            <center>
                <div>{computedValue}</div>
                {listName.map((element) =>{return(<div>{element}</div>)})}
            </center>
        </>
    );
}