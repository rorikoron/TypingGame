import { useRecoilState } from "recoil";
import { GamePhase, gamePhaseAtom, gameVariableAtom, gameVariableProps, InitialGameVariable } from "@renderer/util/GameAtom";
import useKeyboard from "@renderer/hook/useKeyboard";
import useLevel from "@renderer/hook/useLevel";

import style from '@renderer/style/Game.module.scss';
import { useEffect, useState } from "react";
import { Slider } from "./Slider";

const Game : React.FC = () =>{
    const [gamePhase, setGamePhase] = useRecoilState<GamePhase>(gamePhaseAtom);
    const [, setGameVariable] = useRecoilState<gameVariableProps>(gameVariableAtom);

    const { keyPressed } = useKeyboard();

    const { levelSystem, threshold, addExp } = useLevel(() => setGamePhase(GamePhase.inGame__LevelUp));

    const text = `const [text, setText] = useState<string>('placeholder');`;
    const [textIdx, setTextIdx] = useState<number>(0);

    useEffect(() => {
        setGameVariable(InitialGameVariable);
    })

    useEffect(() => {
        const currentCharactrer = text[textIdx];
        
        if(gamePhase === GamePhase.inGame && keyPressed[currentCharactrer]){
            setTextIdx(i => i+1);
            addExp();
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

                </div>
            </div>
        </main>
    )
}

export default Game;
