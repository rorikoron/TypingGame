import { useEffect, useState } from "react";
import Timer from "./Timer";
import Game from "./Game";
import { RecoilRoot, useRecoilState } from "recoil";
import { GamePhase, gamePhaseAtom } from "@renderer/util/GameAtom";



const GameMgr : React.FC = () => {
    //const { gameState, setGameState } = useGameState();
    const [gamePhase, setGamePhase] = useRecoilState(gamePhaseAtom);
    
    useEffect(() => {
        setGamePhase(GamePhase.preGame);
    }, [])
    
    useEffect(() => {
        console.log(gamePhase);

    }, [gamePhase])


    return(
        <>
            {
                {
                    [GamePhase.preGame]: <></>,
                    [GamePhase.inGame]: <Game />,

                }[gamePhase] || <div>Unknown Game State</div>
            }
            <Timer />
        </>
    )
}

export default GameMgr;