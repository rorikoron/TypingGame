import { gameVariableAtom, gameVariableProps } from "@renderer/util/GameAtom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export interface LevelSystemProps{
    level: number,
    exp: number,
}

export default function useLevel(levelup_function){
    const [gameVariable] = useRecoilState<gameVariableProps>(gameVariableAtom);
    
    const [levelSystem, setLevelSystem] = useState<LevelSystemProps>(
        {
            level: 0,
            exp: 0,
        }
    );

    // use * 10 / 10 to show only 1 digit under floating point
    const addLevel = () => setLevelSystem(props => ({...props, level: props.level+1 }));
    const addExp = () => setLevelSystem(props => ({...props, exp: Math.round((props.exp+gameVariable.ExpRatio) * 10) / 10 }));

    const threshold = gameVariable.ExpFormula(levelSystem.level);

    useEffect(() => {
        if(levelSystem.exp >= threshold){
            setLevelSystem(props => ({...props, exp: props.exp - threshold}));
            addLevel();
            levelup_function();
        }
    }, [levelSystem.exp])


    return { levelSystem, threshold, addExp };
}