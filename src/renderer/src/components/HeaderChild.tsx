import { ReactElement } from "react";
import { Link } from "react-router-dom";
import style from '../style/HeaderChild.module.scss'

export interface RouteProps{
    title: string,
    route: string, 
    component? : ReactElement
}


function HeaderChild({title, route} : RouteProps){


    return(
        <Link to={route} className={`${style.link}`}>{title}</Link>
    )
}

export default HeaderChild;