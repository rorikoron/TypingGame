import useSkill, { SkillProps } from '@renderer/hook/useSkill';
import style from '@renderer/style/LevelUp.module.scss';
import { gameVariableAtom, gameVariableProps, ownedSkillAtom } from '@renderer/util/GameAtom';
import { useRecoilState } from 'recoil';
import Card from './Card';
import useKeyboard from '@renderer/hook/useKeyboard';
import { useEffect, useState } from 'react';

interface LevelUpProps{
    onClickEffect: () => void
}
const LevelUp : React.FC<LevelUpProps> = ({onClickEffect}) => {

    const [selectableSkill, setSelectableSkill]  = useState<SkillProps[]>([]);
    const { skills } = useSkill();
    const [ ownedSkill, setOwnedSkill ] = useRecoilState<string[]>(ownedSkillAtom);
    const [ gameVariable ] = useRecoilState<gameVariableProps>(gameVariableAtom);

    
    const selectKeys = ['1', '2', '3', '4'];
    const { keyPressed } = useKeyboard();

    useEffect(() => {
        setSelectableSkill([]);

        // since useState updates asyncly, in order not to infinite loop use temporaly array
        let tempSelectedSkill:SkillProps[] = [];
        let currentSkillCount = selectableSkill.length, currentOwnedCount = ownedSkill.length;

        // while (less than menu count && there are skills exist to be added)
        while(tempSelectedSkill.length < gameVariable.MenuCount && skills.length - currentOwnedCount != 0){
            const rand = Math.floor(Math.random() * skills.length);
    
            // if it has added to candidates or it has owned
            if(tempSelectedSkill.includes(skills[rand]) || ownedSkill.includes(skills[rand].name)) continue;
            tempSelectedSkill.push(skills[rand]); 
            currentSkillCount++;
            currentOwnedCount++;
            console.log(tempSelectedSkill);
            console.log(tempSelectedSkill.length);
        }

        setSelectableSkill(selectable => [...selectable, ...tempSelectedSkill]);

        const names =tempSelectedSkill.map((skill) =>(skill.name));
        setOwnedSkill(owned => [...owned, ...names]);

    }, [])

    useEffect(() => {
        selectableSkill.forEach((skill, idx) => {
            if(keyPressed[selectKeys[idx]]){
                skill.effect();
                onClickEffect();
                console.log(skill.explanation);
                console.log(gameVariable.ExpRatio);
            }
        })
    }, [keyPressed]);
    

    return(
        <div className={`${style.menu}`}>
            {
                selectableSkill.map((skill) => (
                    <Card path={skill.path} explanation={skill.explanation} />
                ))
            }
        </div>
    )
}
export default LevelUp;