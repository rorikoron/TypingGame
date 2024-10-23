import useScore from "@renderer/hook/useScore";

import style from "@renderer/style/Report.module.scss";
import { useRecoilState } from "recoil";
import { SkillProps } from "@renderer/hook/useSkill";
import { gameMetaProps } from "@renderer/util/GameAtom";


const Report : React.FC<gameMetaProps> = ({language, ownedSkill}) => {

    const { scoreSystem } = useScore();

    return(
        <main className={`${style.main}`}>
            <span className={`${style.title}`}>{language}</span>
            <div className={`${style.content}`}>
                <div className={`${style.status}`}>
                    <span className={`${style.status__score} ${style.label}`}>Your Score: <span className={`${style.value}`}>{scoreSystem.score}</span></span>
                    <span className={`${style.status__score} ${style.label}`}>Total Corrected Skill: <span className={`${style.value}`}>{ownedSkill.length}</span></span>
                    <ul className={`${style.status__list}`}>
                        {
                            ownedSkill.map(({path, name, explanation}) => (
                                <li key={name}><img src={path}/></li>
                            ))
                        }
                    </ul>
                </div>


            </div>
        </main>

    )
}

export default Report;