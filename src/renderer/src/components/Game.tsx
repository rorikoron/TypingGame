import { useEffect, useState } from "react";
import Timer from "./Timer";
import useGameState, { GameStatus } from '@renderer/hook/useGameState';



const Game : React.FC = () => {
    const {setGameState} = useGameState();
    
    useEffect(() => {
        setGameState(GameStatus.preGame);
    }, [])


    

    return(
        <>
            <Timer />
        </>
    )
}

export default Game;