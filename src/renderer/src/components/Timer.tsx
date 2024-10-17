import useGameState, { GameStatus } from "@renderer/hook/useGameState";
import { useEffect, useState } from "react";
import style from '@renderer/style/Timer.module.scss'


const Timer : React.FC = () =>{

    const { gameState, setGameState } = useGameState();
    const [inGameCountdown, setInGameCountdown] = useState<number>(180);
    const [preGameCountdown, setPreGameCountdown] = useState<number>(5);

    
    useEffect(() => {
        if(preGameCountdown > 0){
            const countdown =  setInterval(() => {
                setPreGameCountdown(t => t - 1)
            }, 1000);
            return () =>  clearInterval(countdown);
        }else{
            setGameState(GameStatus.inGame);
        }
    }, [preGameCountdown]);

    useEffect(() => {

        if(gameState == GameStatus.inGame && inGameCountdown > 0){
            const countdown =  setInterval(() => {
                setInGameCountdown(t => t - 1)
            }, 1000);
            return () =>  clearInterval(countdown);
        }else{
            setGameState(GameStatus.postGame);
        }
    }, [gameState, inGameCountdown]);


    const PreGameCountdown : React.FC = () => {
        return(
            <span className={`${style.preGameCountdown}`}></span>
        )
    } 

    return(
        <>
            {
                {
                    [GameStatus.preGame]: <PreGameCountdown />,
                    [GameStatus.inGame]: <></>
                }[gameState]
            }
        </>
    )
}

export default Timer;