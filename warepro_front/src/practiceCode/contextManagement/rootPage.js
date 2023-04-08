import React, {useState} from "react";
import {User} from "./user";
import DecrementCounter from "./ContextApp/decrementCounter";


export const UserContext = React.createContext();

export default function RootPage() {

    const [counter, setCounter] = useState(0);

    const incrementCompteur = () => {
        setCounter(prev => prev + 1);
    };

    return (
        <UserContext.Provider value={[counter, setCounter]}>
            <button onClick={incrementCompteur}>+</button>
            <DecrementCounter/>
            <User />
        </UserContext.Provider>
    );
}