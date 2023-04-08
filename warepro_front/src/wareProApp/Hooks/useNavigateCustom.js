
// this hook is used to simplify the navigation in the application,
// it will contain the boilerplate of navigation, and if there is any optimisation
// or some treatment to add it will be handled here.

import {useNavigate} from "react-router-dom";

export default function useNavigateCustom(target){

    // this hook will directly return the function of the navigation.

    const navigate = useNavigate();
    const routeChange = () => {
        navigate(target);
    };

    return routeChange;
}