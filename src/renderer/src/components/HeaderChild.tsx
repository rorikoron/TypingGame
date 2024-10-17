import { ReactElement } from "react";
import { Link } from "react-router-dom";


export interface RouteProps{
    title: string,
    route: string, 
    component? : ReactElement
}


function HeaderChild({title, route} : RouteProps){
    return(
        <Link to={route}>{title}</Link>
    )
}

export default HeaderChild;