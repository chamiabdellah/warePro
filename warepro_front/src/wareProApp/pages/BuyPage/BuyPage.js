import React, {useContext, useEffect, useState} from 'react';
import ArticleInfoDetails from "../../Components/ArticleInfoDetails/ArticleInfoDetails";
import findArticleByCode from "../../Functions/findArticleByCode";
import useActionOnCodeBare from "../../Hooks/useActionOnCodeBare";
import ArticleDontExistNotification
    from "../../Components/Notifications/ArticleDontExistNotification/ArticleDontExistNotification";
import Article from "../../Domain/Article";
import ArticleOfCart from "../../Domain/ArticleOfCart";
import CartContext from "../../stores/cartContext";
import Cart from "../../Domain/Cart";

export default function BuyPage() {

    const [cart,setCart] = useContext(CartContext);

    const PURCHASE_INITIAL_STATE = {
        articleCode : '',
        individualQuantity : 1,
        lotQuantity : 1
    };
    const [purchaseForm, setPurchaseForm ] = useState(PURCHASE_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [corresArticle, setCorresArticle] = useState();

    useEffect(()=>{
        void findArticleByCode(purchaseForm.articleCode, setCorresArticle);
    },[purchaseForm.articleCode]);


    function changeQuantity(operation, attribute){
        if(operation === '+'){
            console.log("increment the quantity");
            setPurchaseForm((prevState)=>{
                return {
                    ...prevState,
                    [attribute] : prevState[attribute] + 1
                };
            });
        }else if(operation === '-'){
            console.log("decrement the quantity");
            setPurchaseForm((prevState)=>{
                if(prevState[attribute] > 1){
                    return {
                        ...prevState,
                        [attribute] : prevState[attribute] - 1
                    };
                } else {
                    return prevState;
                }
            });
        }
    }

    const updatePurshaseForm = (newValue)=>{
        setPurchaseForm((prev) => {
        return {
            ...prev,
            articleCode : newValue.code,
        }
    })};

    const [notFoundCode, setNotFoundCode] = useState("");
    useActionOnCodeBare(updatePurshaseForm, setNotFoundCode);

    function handleChange(event){
        event.preventDefault();
        setPurchaseForm((prevState)=>{
            return {
                ...prevState,
                [event.target.id] : event.target.value
            };
        });
    }

    async function incrementQuantity(){

        setIsLoading(true);
        const endpointURL = "http://localhost:8080/api/articles/manageArticlesQuantity/increment/"+ purchaseForm.articleCode;
        const computedQuantity = purchaseForm.lotQuantity * purchaseForm.individualQuantity;
        const requestURL = endpointURL + '?quantity=' + computedQuantity;

        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json','Accept': 'application/json'},
        };

        const response = await fetch(requestURL , requestOptions);
        if(response.status == 200){
            setIsFailed(false);
            console.log("quantity incremented with success");
        } else {
            setIsFailed(true);
            console.log("error");
        }

        /* create the object
            the schema of the object as follows :
                - Cart :
                     - List of 'ArticleOfCart' :
                                    - id
                                    - Article,
                                    - Quantity,
                                        each 'Article' :
                                            - id,
                                            - code,
                                            - name,
                                            - quantity,
        */
        // we differentiate two cases :
        /*let articleExists = false;

        // 1 - the article already exists in the list.
        cart.listOfPurchaseArticles.forEach((articleOfCart)=> {
            if(articleOfCart.id === corresArticle.id){
                articleOfCart.quantity += purchaseForm.individualQuantity * purchaseForm.lotQuantity;
                articleExists = true;
            }
        });
        // 2 - the article is new in the list.
        if(!articleExists){
            // create the Article object with 1 in quantity.
            const article = new Article(corresArticle.id, corresArticle.code, corresArticle.articleName, corresArticle.quantity);
            const articleOfCart = new ArticleOfCart(article ,1);
            setCart((preCart)=>{
                preCart.listOfPurchaseArticles.push(articleOfCart);
            });
            console.log(articleOfCart);
        }*/
        // we can differentiate three cases :
        //    the list is empty ; the article doesn't exist ; the article exist.
        if(cart.length === 0){
            // create the Cart object and manipulate it.
            console.log(cart);
            const newCart = new Cart();
            newCart.listOfPurchaseArticles.push(new ArticleOfCart(corresArticle, computedQuantity));
            setCart((prev)=>{
                return [newCart];
            });
            console.log(cart[0]);
            console.log(typeof(cart));
        } else {
            // treat the two other cases :
            // 1 - test whether the article exists or not :
            let containArticle = false;
            console.log(cart[0]);
            const newCart = cart[0];
            newCart.listOfPurchaseArticles.forEach((articleOfCart) => {
                if(articleOfCart.articleId === corresArticle.id){
                    articleOfCart.cartQuantity += computedQuantity;
                    containArticle = true;
                }
            });
            console.log(containArticle);

            // 2 - new Article => push the article to the list.
            if(containArticle){
               setCart((prev) => [newCart]);
            } else {
                const newCart = cart;
                newCart[0].listOfPurchaseArticles.push(new ArticleOfCart(corresArticle, computedQuantity));
                setCart((prev) => [newCart[0]]);
            }
        }

        setIsLoading(false);

    }

    return(
        <div className="BuyPage">
            <h1>Select or Scan the item to buy</h1>

                {notFoundCode !== "" && <ArticleDontExistNotification props={notFoundCode}/>}
                <div>
                    <label htmlFor="articleCode">Article code</label>
                    <input type="text" id="articleCode"
                    value={purchaseForm.articleCode} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="individualQuantity">Individual quantity</label>
                    <button type="button" onClick={()=>changeQuantity('+','individualQuantity')}>+</button>
                    <input type="number" id="individualQuantity" min="0"
                    value={purchaseForm.individualQuantity} onChange={handleChange}/>
                    <button type="button" onClick={()=>changeQuantity('-','individualQuantity')}>-</button>
                </div>
                <div>
                    <label htmlFor="lotQuantity"> Quantity by Lot</label>
                    <button type="button" onClick={()=>changeQuantity('+','lotQuantity')}>+</button>
                    <input type="number" id="lotQuantity" min="0"
                    value={purchaseForm.lotQuantity} onChange={handleChange}/>
                    <button type="button" onClick={()=>changeQuantity('-','lotQuantity')}>-</button>
                </div>
                <div>
                    <button type="submit"
                    onClick={incrementQuantity}>VALIDATE</button>
                </div>

            <div>
                {corresArticle != null && <ArticleInfoDetails article={corresArticle}/>}
            </div>

        </div>
    );
}