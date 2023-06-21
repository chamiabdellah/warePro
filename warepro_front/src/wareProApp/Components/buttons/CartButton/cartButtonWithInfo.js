import React, {useContext, useState} from "react";
import './cartButtonWithInfo.css';
import CartContext from "../../../stores/cartContext";
import CartElementDetail from "../../CartElementDetail/CartElementDetail";
import Cart from "../../../Domain/Cart";

export default function CartButtonWithInfo(){

    const [cart, setCart] = useContext(CartContext);
    const [showTable, setShowTable] = useState(false);

    if(cart.length === 0){
        return(<div>
            {cart}
            </div>);
    }

    console.log(cart[0].listOfPurchaseArticles.length);

    let totalAmount = 0;
    cart[0].listOfPurchaseArticles.forEach((articleOfCart) => {
       totalAmount += articleOfCart.article.price * articleOfCart.cartQuantity;
    })

    const deletePurchase = () => {
        // save a new state (new Cart).
        setCart((prev)=>[new Cart()]);
    }

    const confirmPurchase = async () => {
        /*
            the format of the purchase is as follows :
                * - List of elements, and for each line :
                    * article
                    * quantity
           And in return we will get the saved object and the status code.
         */
        const endpointURL = "http://localhost:8080/api/purchases";
        const requestOptions = {
            method:'PUT',
            headers: {'Content-Type': 'application/json','Accept': 'application/json'},
            body : JSON.stringify(cart[0].listOfPurchaseArticles.map(cartLine => {
                return {article: cartLine.articleId, quantity: cartLine.cartQuantity}
            })),
        };
        const response = await fetch(endpointURL, requestOptions);
        console.log(response);
        if(response.status === 200){
            const validatedArticles = await response.json();
            deletePurchase();
        }

    }

    return(
        <div className="cartButton">
            <div>{cart[0].listOfPurchaseArticles.length}</div>
            <button onClick={()=>setShowTable(!showTable)}>Cart</button>
            <div>{totalAmount} MAD</div>
            {showTable && <><div className="cartDivision">
                {cart[0].listOfPurchaseArticles.map((articleOfCart)=>{
                    return <CartElementDetail cartArticle={articleOfCart} key={articleOfCart.articleId} />
                })}

            <div className="validationButtons">
                <button onClick={deletePurchase}>CANCEL</button>
                <button onClick={confirmPurchase}>BUY</button>
            </div>
            </div>
                </>
            }
        </div>
    );
}