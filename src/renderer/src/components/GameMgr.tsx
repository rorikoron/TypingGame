import { useEffect, useState } from "react";
import Timer from "./Timer";
import Game from "./Game";
import Report from "./Report";
import LevelUp from "./LevelUp";
import {  useRecoilState } from "recoil";
import { gameMetaAtom, GamePhase, gamePhaseAtom, languageType } from "@renderer/util/GameAtom";
import QuestionData from '@renderer/Questions.json';


const GameMgr : React.FC = () => {
    //const { gameState, setGameState } = useGameState();
    const [gamePhase, setGamePhase] = useRecoilState(gamePhaseAtom);
    const [gameMeta, setGameMeta] = useRecoilState(gameMetaAtom);

    const returnToGame = () => setGamePhase(GamePhase.inGame);
    const question : string[] = QuestionData[gameMeta.language];
    const setLanguage = ( lang :languageType ) =>  setGameMeta(m => ({...m, language: lang}))
    
    useEffect(() => {
        setGamePhase(GamePhase.preGame);
        setLanguage(languageType.react_tsx);

    }, [])

    return(
        <>
            {
                {
                    [GamePhase.preGame]: <></>,
                    [GamePhase.postGame]: <Report {...gameMeta} />,

                }[gamePhase] || <Game question = {question} />
            }

            {
                {
                    [GamePhase.inGame__LevelUp]: <LevelUp onClickEffect={returnToGame} />
                }[gamePhase]
            }
            <Timer />
        </>
    )
}

export default GameMgr;