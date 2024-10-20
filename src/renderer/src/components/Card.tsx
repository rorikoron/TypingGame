import style from '@renderer/style/Card.module.scss';


interface CardProps{
    path: string,
    alt?: string,
    explanation: string
    onClickEffect?: () => void
}

const Card : React.FC<CardProps> = ({path, alt, explanation, onClickEffect}) => {
    console.log({path})
    return(
        <figure className={`${style.card}`}>
            <img src={path} alt={alt} className={`${style.card__image}`} />

            <figcaption className={`${style.card__caption}`}>{explanation}</figcaption>
        </figure>
    )
}

export default Card;