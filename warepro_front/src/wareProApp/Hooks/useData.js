
/* TODO : create a custom hook to fetch the data from the server
 Advantages :
    - implement the fetching with HATEOS in one place.
    - manage the Errors in one place.
    - easy to use in all Components.
    - have a more readable code in the components.
    - one place to debug.
    - any new features can be implemented in one place.
*/

// the useData Hook will get as a parameter the url to fetch, and it will return
// the data and the state in two different variables, we should add a variable
// which contains the error

import {useEffect, useState} from "react";

export default function useData(url, articleId){

    // 1- declare the states :
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(false);

    // 2- make the request to the server :
    useEffect(()=>{

        async function fetchData(){
            const response = await  fetch(url);
            if(response.status == 200){
                const data = await response.json();
                setData(data);
            } else {
                setErrors(true);
            }
            setIsLoading(false);
        }

        void fetchData();
    },[articleId]);

    return [data,isLoading, errors];
}