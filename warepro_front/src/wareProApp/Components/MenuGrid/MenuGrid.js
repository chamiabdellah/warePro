import React from 'react';
import MenuItem from "../MenuItem/MenuItem";

export default function MenuGrid() {

    return(
        <div className="menuGrid">
            <ul>
               <li>What do you want to do ?</li>
            </ul>
            <MenuItem props={{name:'Inventory', destination:'/inventory'}} />
            <MenuItem props={{name:'Buy',destination:'/buy'}} />
            <MenuItem props={{name:'Sell', destination:'/sell'}} />
        </div>
    );
}