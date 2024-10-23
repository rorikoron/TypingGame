import useSkill, { SkillProps } from '@renderer/hook/useSkill';
import style from '@renderer/style/LevelUp.module.scss';
import { gameMetaAtom, gameMetaProps, gameVariableAtom, gameVariableProps } from '@renderer/util/GameAtom';
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
    const [ {ownedSkill}, setGameMeta ] = useRecoilState<gameMetaProps>(gameMetaAtom);
    const [ gameVariable ] = useRecoilState<gameVariableProps>(gameVariableAtom);

    // keys used to choose skill
    const selectKeys = ['1', '2', '3', '4'];
    const { keyPressed } = useKeyboard();

    useEffect(() => {
        console.log(ownedSkill);
        setSelectableSkill([]);

        // since useState updates asyncly, in order not to infinite loop, use temporaly array
        let tempSelectedSkill:SkillProps[] = [];
        let currentSkillCount = selectableSkill.length, currentOwnedCount = ownedSkill.length;

        // while (less than menu count && there are skills exist to be added)
        while(tempSelectedSkill.length < gameVariable.MenuCount && skills.length - currentOwnedCount != 0){
            const rand = Math.floor(Math.random() * skills.length);
    
            // if it has added to candidates or it has owned
            if(tempSelectedSkill.includes(skills[rand]) || ownedSkill.some(({name}) => name === skills[rand].name)) continue;
            console.log(ownedSkill.includes(skills[rand] ));
            console.log(ownedSkill);
            console.log(tempSelectedSkill);
            tempSelectedSkill.push(skills[rand]); 
            currentSkillCount++;
            currentOwnedCount++;
        }
        setSelectableSkill(selectable => [...selectable, ...tempSelectedSkill]);

    }, [])

    useEffect(() => {
        selectableSkill.forEach((skill, idx) => {
            if(keyPressed[selectKeys[idx]]){
                setGameMeta(m => ({...m, ownedSkill: [...ownedSkill, skill]}));
                skill.effect();
                onClickEffect();
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