import React, {useContext} from "react";
import "./CartElementDetail.css";
import CartContext from "../../stores/cartContext";
import Cart from "../../Domain/Cart";

export default function CartElementDetail({cartArticle}){

    const [cart,setCart] = useContext(CartContext);

    const changeCartQuantity = (operation) =>{
        // 1 - create a new Cart with a new reference.
        const newCart = cart[0];

        // 2 - for the selected article change the quantity.
        newCart.listOfPurchaseArticles.forEach((articleOfCart) => {
           if(articleOfCart.articleId === cartArticle.articleId){
               if(operation === '+' && articleOfCart.article.quantity >= articleOfCart.cartQuantity){
                   articleOfCart.cartQuantity++;
               } else if(operation === '-' && articleOfCart.cartQuantity > 0){
                   articleOfCart.cartQuantity--;
               }
           }
        });

        // 3 - save the new state in the global state.
        setCart((prev) => [newCart]);
    };

    const deleteCartElement = ()=>{

        // 1 - create a new State.
        const newCart = cart[0];
        console.log(cart[0].listOfPurchaseArticles);
        // 2 - delete the targeted Cart element.
        const newCartList = cart[0].listOfPurchaseArticles.filter((articleOfCart)=>{
            return articleOfCart.articleId !== cartArticle.articleId;
        });
        console.log(newCartList);

        // 3 - save in the global state.
        newCart.listOfPurchaseArticles = newCartList;
        setCart((prev)=>[newCart]);
    };

    return(
        <div>
            <div>{cartArticle.article.articleName}</div>
            <div>
                <span>{cartArticle.article.price}</span>
                <button onClick={()=>changeCartQuantity('+')}>+</button>
                <span>{cartArticle.cartQuantity}</span>
                <button onClick={()=>changeCartQuantity('-')}>-</button>
                <span>{cartArticle.cartQuantity * cartArticle.article.price}</span>
                <button onClick={deleteCartElement} >Delete</button>
            </div>
        </div>
    )

}