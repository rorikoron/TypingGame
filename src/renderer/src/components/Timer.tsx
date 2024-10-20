import { useEffect, useState } from "react";
import style from '@renderer/style/Timer.module.scss'
import { useRecoilState } from "recoil";
import { GamePhase, gamePhaseAtom } from "@renderer/util/GameAtom";


const Timer : React.FC = () =>{

    const [gamePhase, setGamePhase] = useRecoilState(gamePhaseAtom);

    //const { gameState, setGameState } = useGameState();
    const [inGameCountdown, setInGameCountdown] = useState<number>(180);
    const [preGameCountdown, setPreGameCountdown] = useState<number>(5);


    useEffect(() => {
        if(preGameCountdown > 0){
            const countdown =  setInterval(() => {
                setPreGameCountdown(t => t - 1)
            }, 1000);
            return () =>  clearInterval(countdown);
        }else{
            setGamePhase(GamePhase.inGame);
        }
    }, [preGameCountdown]);

    useEffect(() => {
        if(gamePhase !== GamePhase.inGame) return;

        if(inGameCountdown > 0){
            const countdown =  setInterval(() => {
                setInGameCountdown(t => t - 1)
            }, 1000);
            return () =>  clearInterval(countdown);
        }else{
            setGamePhase(GamePhase.postGame);
        }
    }, [gamePhase, inGameCountdown]);


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
                    [GamePhase.preGame]: <PreGameCountdown />,
                    [GamePhase.postGame]: <></> 
                }[gamePhase] || <InGameCountdown />
            }
        </>
    )
}

export default Timer;