import BuyPage from "../BuyPage/BuyPage";
import SellPage from "../SellPage/SellPage";
import { Route, Routes } from 'react-router-dom';
import InventoryPage from "../InventoryPage/InventoryPage";
import React, {useState} from 'react';
import MenuPage from "../MenuPage/MenuPage";
import HomeButton from "../../Components/buttons/HomeButton/HomeButton";
import ArticleDetailsPage from "../ArticleDetailsPage/ArticleDetailsPage";
import AddArticlePage from "../AddArticlePage/AddArticlePage";
import PreviousPageButton from "../../Components/buttons/PreviousPageButton/PreviousPageButton";
import CartButtonWithInfo from "../../Components/buttons/CartButton/cartButtonWithInfo";
import Cart from "../../Domain/Cart";
import CartContext from "../../stores/cartContext";


function MainPage() {

    // create the state that will be managed.
    const [purchasedArticles, setPurchasedArticles] = useState([]);

    return (
        <CartContext.Provider value={[purchasedArticles, setPurchasedArticles]}>
            <div className="MainPage">
                <PreviousPageButton/>
                <HomeButton/>
                <CartButtonWithInfo/>
                <Routes>
                    <Route path="/inventory" element={<InventoryPage /> }/>
                    <Route path="/getarticle" element={<ArticleDetailsPage />} />
                    <Route path="/addArticle" element={<AddArticlePage/>}/>
                    <Route path="/buy" element={<BuyPage /> }/>
                    <Route path="/sell" element={<SellPage /> }/>
                    <Route path="/" element={<MenuPage /> }/>
                </Routes>
            </div>
        </CartContext.Provider>
    );
}

export default MainPage;