import useGameState, { GameStatus } from "@renderer/hook/useGameState";
import { useEffect, useState } from "react";
import style from '@renderer/style/Timer.module.scss'


const Timer : React.FC = () =>{

    const { gameState, setGameState } = useGameState();
    const [inGameCountdown, setInGameCountdown] = useState<number>(180);
    const [preGameCountdown, setPreGameCountdown] = useState<number>(5);


    useEffect(() => {
        if(preGameCountdown > 0){
            console.log(preGameCountdown)
            console.log(gameState)
            const countdown =  setInterval(() => {
                setPreGameCountdown(t => t - 1)
            }, 1000);
            return () =>  clearInterval(countdown);
        }else{
            setGameState(GameStatus.inGame);
        }
    }, [preGameCountdown]);

    useEffect(() => {
        if(gameState !== GameStatus.inGame) return;

        if(inGameCountdown > 0){
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
            <div className={`${style.preGameCountdown}`}>
                <span className={`${style.preGameCountdown__time}`}>{preGameCountdown}</span>
                <span className={`${style.preGameCountdown__title}`}>Are you ready...?</span>
            </div>
        )
    } 

    const InGameCountdown : React.FC = () => {
        return(
            <span className={`${style.inGameCountdown}`}>{inGameCountdown}</span>
        )
    }

    return(
        <>
            {
                {
                    [GameStatus.preGame]: <PreGameCountdown />,
                    [GameStatus.inGame]: <InGameCountdown />
                }[gameState]
            }
        </>
    )
}

export default Timer;