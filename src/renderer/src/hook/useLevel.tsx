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

    const addLevel = () => setLevelSystem(props => ({...props, level: props.level+1 }));
    const addExp = () => setLevelSystem(props => ({...props, exp: props.exp+gameVariable.ExpRatio }));

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