import HeaderChild, { RouteProps } from "./HeaderChild";
import style from '../style/Header.module.scss'
import { useState } from "react";

interface HeaderProps{
    routes: RouteProps[]
}

const Header : React.FC<HeaderProps> = ({ routes }) => {

    const [extend, setExtend] = useState<boolean>(false);

    return(
        <div className={`${style.header}`}  data-extend={extend} onMouseLeave={() => setExtend(false)} onMouseOver={() => setExtend(true)}>
            
            <ul className={`${style.header__list}`}>
                {
                    routes.map((child) => (
                        <li key={child.title} className={`${style.header__list__child}`}><HeaderChild {...child} /></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Header;