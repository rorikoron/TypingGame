import useKeyboard from "@renderer/hook/useKeyboard";
import style from '@renderer/style/Game.module.scss';
import { useEffect, useState } from "react";


const Game : React.FC = () =>{
    const { keyPressed } = useKeyboard();
    const text = `const [text, setText] = useState<string>('placeholder');`;
    const [textIdx, setTextIdx] = useState<number>(0);
    
    useEffect(() => {
        const currentCharactrer = text[textIdx];
        
        if(keyPressed[currentCharactrer]){
            setTextIdx(i => i+1);
        }
    }, [keyPressed])

    return(
        <main className={`${style.main}`}>
            <div className={`${style.text}`}>
                <span className={`${style.text__typed}`}>{text.substring(0, textIdx)}</span>
                <span className={`${style.text__untyped}`}>{text.substring(textIdx, text.length)}</span>
            </div>
        </main>
    )
}

export default Game;
