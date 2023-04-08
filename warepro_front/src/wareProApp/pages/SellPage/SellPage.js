import React, {useEffect, useState} from 'react';
import ArticleInfoDetails from "../../Components/ArticleInfoDetails/ArticleInfoDetails";
import findArticleByCode from "../../Functions/findArticleByCode";
import useActionOnCodeBare from "../../Hooks/useActionOnCodeBare";
import {useSearchParams} from "react-router-dom";
import ArticleDontExistNotification
    from "../../Components/Notifications/ArticleDontExistNotification/ArticleDontExistNotification";


export default function SellPage() {

    const PURCHASE_INITIAL_STATE = {
        articleCode : '',
        individualQuantity : 1,
        lotQuantity : 1
    };
    const [sellForm, setSellForm ] = useState(PURCHASE_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [corresArticle, setCorresArticle] = useState();
    const [params] = useSearchParams();

    useEffect(()=>{
        void findArticleByCode(sellForm.articleCode, setCorresArticle);

    },[sellForm.articleCode])

    useEffect(() =>{
        const code = params.get("code");
        if(code != null){
            setSellForm((prev)=>{
                return {
                    ...prev,
                    articleCode : code
                }
            })
        }
        void findArticleByCode(sellForm.articleCode, setCorresArticle);
    },[])

    function changeQuantity(operation, attribute){
        if(operation == '+'){
            console.log("increment the quantity");
            setSellForm((prevState)=>{
                return {
                    ...prevState,
                    [attribute] : prevState[attribute] + 1
                };
            });
        } else if(operation == '-'){
            console.log("decrement the quantity");
            setSellForm((prevState)=>{
                return {
                    ...prevState,
                    [attribute] : prevState[attribute] - 1
                };
            });
        } else{
            console.log("this operation was not recognised");
        }
    }

    const updateSellForm = (newValue)=>{
        setSellForm((prev) => {
            return {
                ...prev,
                articleCode : newValue.code,
            }
        })};

    const [notFoundCode, setNotFoundCode] = useState("");
    useActionOnCodeBare(updateSellForm ,setNotFoundCode);

    async function handleChange(event){
        event.preventDefault();
        setSellForm((prevState)=>{

             const newState = {
                ...prevState,
                [event.target.id] : event.target.value
            };
             return newState;
        });
    }

    async function decrementQuantity(){

        setIsLoading(true);
        const endpointURL = "http://localhost:8080/api/articles/manageArticlesQuantity/decrement/"+ sellForm.articleCode;
        const computedQuantity = sellForm.lotQuantity * sellForm.individualQuantity;
        const requestURL = endpointURL + '?quantity=' + computedQuantity;

        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json','Accept': 'application/json'},
            body : JSON.stringify(sellForm)
        };

        const response = await fetch(requestURL, requestOptions);
        if(response.status == 200){
            setIsFailed(false);
            console.log("quantity decremented with success");
        } else {
            setIsFailed(true);
            console.log("error");
        }
        setIsLoading(false);
    }


    return(
        <div className="SellPage">
            <h1>Select or Scan the item Sold</h1>

            {notFoundCode !== "" && <ArticleDontExistNotification props={notFoundCode}/>}
            <div>
                <label htmlFor="articleCode">Article code</label>
                <input type="text" id="articleCode"
                       value={sellForm.articleCode} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="individualQuantity">Individual quantity</label>
                <button type="button" onClick={()=>changeQuantity('+','individualQuantity')}>+</button>
                <input type="number" id="individualQuantity"
                       value={sellForm.individualQuantity} onChange={handleChange}/>
                <button type="button" onClick={()=>changeQuantity('-','individualQuantity')}>-</button>
            </div>
            <div>
                <label htmlFor="lotQuantity"> Quantity by Lot</label>
                <button type="button" onClick={()=>changeQuantity('+','lotQuantity')}>+</button>
                <input type="number" id="lotQuantity"
                       value={sellForm.lotQuantity} onChange={handleChange}/>
                <button type="button" onClick={()=>changeQuantity('-','lotQuantity')}>-</button>
            </div>
            <div>
                <button type="submit"
                        onClick={decrementQuantity}>VALIDATE</button>
            </div>

            <center>
                {corresArticle != null && <ArticleInfoDetails article={corresArticle}/>}
            </center>

        </div>
    );
}