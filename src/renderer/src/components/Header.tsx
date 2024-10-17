import HeaderChild, { RouteProps } from "./HeaderChild";
import style from '../assets/Header.module.scss'

interface HeaderProps{
    routes: RouteProps[]
}

const Header : React.FC<HeaderProps> = ({ routes }) => {
    return(
        <div className={`${style.header}`}>
            <span> Rendering Header </span>
            <ul>
                {
                    routes.map((child) => (
                        <li key={child.title}><HeaderChild {...child} /></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Header;