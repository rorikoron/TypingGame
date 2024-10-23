import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import style from '@renderer/style/Game.module.scss';

import { gameMetaProps, GamePhase, gamePhaseAtom, gameVariableAtom, gameVariableProps, InitialGameVariable, gameMetaAtom, InitialGameMeta } from "@renderer/util/GameAtom";
import useKeyboard from "@renderer/hook/useKeyboard";
import useLevel from "@renderer/hook/useLevel";
import useScore from "@renderer/hook/useScore";

import { Slider } from "./Slider";

interface GameProps{
    question: string[]
}

const Game : React.FC<GameProps> = ({question}) =>{
    const [gamePhase, setGamePhase] = useRecoilState<GamePhase>(gamePhaseAtom);
    const [, setGameMeta] = useRecoilState<gameMetaProps>(gameMetaAtom);
    const [, setGameVariable] = useRecoilState<gameVariableProps>(gameVariableAtom);

    const { keyPressed } = useKeyboard();

    const { levelSystem, threshold, addExp } = useLevel(() => setGamePhase(GamePhase.inGame__LevelUp));
    const { scoreSystem, addScore } = useScore();
    
    const [text, setText] = useState<string>("");
    const [textIdx, setTextIdx] = useState<number>(0);

    const setRandomText = () => {
        //select random question from data
        const rand = Math.floor(Math.random() * question.length);
        setText(question[rand]);

        // reset index
        setTextIdx(0);
    }

    useEffect(() => {
        setRandomText();
        setGameMeta(InitialGameMeta)
        setGameVariable(InitialGameVariable);
    }, [])


    useEffect(() => {
        const currentCharactrer = text[textIdx];
        
        // if matches
        if(gamePhase === GamePhase.inGame && keyPressed[currentCharactrer]){
            setTextIdx(i => i+1);
            addExp();
            addScore();
        }
        // if complete
        if(textIdx === text.length){
            setRandomText();
        }
    }, [keyPressed])


    return(
        <main className={`${style.main}`}>
            <div className={`${style.text}`}>
                <span className={`${style.text__wrapper}`}>

                    <span className={`${style.text__typed}`}>{text.substring(0, textIdx)}</span>
                    <span className={`${style.text__untyped}`}>{text.substring(textIdx, text.length)}</span>
                </span>
            </div>
            <div className={`${style.status}`}>
                <div className={`${style.status__exp}`}>
                    <Slider limit={threshold} value={levelSystem.exp} color={'#8797e6'}/>
                    <span className={`${style.score}`}>{scoreSystem.score}</span>
                </div>
            </div>
        </main>
    )
}

export default Game;
