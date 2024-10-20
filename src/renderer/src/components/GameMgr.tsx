import { useEffect } from "react";
import Timer from "./Timer";
import Game from "./Game";
import LevelUp from "./LevelUp";
import {  useRecoilState } from "recoil";
import { GamePhase, gamePhaseAtom } from "@renderer/util/GameAtom";



const GameMgr : React.FC = () => {
    //const { gameState, setGameState } = useGameState();
    const [gamePhase, setGamePhase] = useRecoilState(gamePhaseAtom);
    const returnToGame = () => setGamePhase(GamePhase.inGame);
    
    useEffect(() => {
        setGamePhase(GamePhase.preGame);
    }, [])

    return(
        <>
            {
                {
                    [GamePhase.preGame]: <></>,
                    [GamePhase.postGame]: <></>,

                }[gamePhase] || <Game />
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