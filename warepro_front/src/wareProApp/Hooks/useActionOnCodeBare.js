import {useCallback, useEffect, useRef, useState} from "react";
import findArticleByCode from "../Functions/findArticleByCode";

export default function useActionOnCodeBare(actionOnValidArticle, setArticleNotFound){

    const [scannedArticle, setScannedArticle] = useState();
    const [typedCode,setTypedCode] = useState("");
    const assembleCode = useCallback(async (event) =>{
        setTypedCode((prev)=> {
            if(event.key !== "Enter"){
                return prev.concat(event.key);
            } else {
                return prev;
            }
        });
        if(event.key === 'Enter'){
            console.log(typedCode);
            await findArticleByCode(typedCode, setScannedArticle);
        }
    },[typedCode]);

    const isFirstRender = useRef(true);
    useEffect(()=>{
        if(isFirstRender.current){
            isFirstRender.current = false;
        } else {
            if(scannedArticle != null){
                console.log(scannedArticle);
                actionOnValidArticle(scannedArticle);
            } else if(scannedArticle == null) {
                console.log("the article doesn't exist in the database => would you like to add it ?");
                setArticleNotFound(typedCode);
            }
            setTypedCode("");
        }
    },[scannedArticle]);

    useEffect(()=>{
        window.addEventListener("keydown",assembleCode);
        return () => {
            window.removeEventListener("keydown",assembleCode);
        }
    },[assembleCode]);
}