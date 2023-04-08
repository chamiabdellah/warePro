import React from 'react';
import Manatee from "./componenents/Manatee";
import './RoutesApp.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Narwhal from "./componenents/Narwhal";
import Whale from "./componenents/Whale";

export default function RoutesApp() {

    /**
     * TODO : FYI : for more information please visit : https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router
     */

    return (
        <div className="wrapper">
            <h1>Marine Mammals</h1>
            <BrowserRouter>
                <nav>
                    <ul>
                        <li><Link to="/Manatee">Manatee</Link></li>
                        <li><Link to="/Narwhal">Narwhal</Link></li>
                        <li><Link to="/whale">whale</Link></li>
                        <li><Link to="/whale?type=beluga">Beluga whale</Link></li>
                        <li><Link to="/whale?type=blue">Blue whale</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/Manatee" element={<Manatee/>}/>
                    <Route path="/Narwhal" element={<Narwhal/> }/>
                    <Route path="/whale" element={<Whale/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}