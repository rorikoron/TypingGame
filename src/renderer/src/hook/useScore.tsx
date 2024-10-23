import { gameVariableAtom, gameVariableProps } from "@renderer/util/GameAtom";
import { useState } from "react";
import { useRecoilState } from "recoil";

export interface ScoreSystemProps{
    score: number,
    scoreRatio: number,
}

export default function useScore(){
    const [gameVariable] = useRecoilState<gameVariableProps>(gameVariableAtom);
    
    const [scoreSystem, setScoreSystem] = useState<ScoreSystemProps>(
        {
            score: 0,
            scoreRatio: gameVariable.ScoreRatio
        }
    );

    const addScore = () => setScoreSystem(props => ({...props, score: Math.round( (props.score + scoreSystem.scoreRatio) * 10 ) / 10 }));
    const setScoreRatio = (x) => setScoreSystem(props => ({...props, scoreRatio: x }));

    return { scoreSystem, addScore, setScoreRatio };
}