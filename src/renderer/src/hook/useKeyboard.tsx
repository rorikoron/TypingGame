import { useEffect, useState } from "react";

export default function useKeyboard() {
    const [keyPressed, setKeyPressed] = useState<Object>({});

    function handleDown({ key }) {
        setKeyPressed((prev) => ({
            ...prev,
            [key]: true,
        }))
    }
  
    function handleUp({ key }) {
        setKeyPressed((prev) => ({
            ...prev,
            [key]: false,
        }))
    }
  
    useEffect(() => {
        
        window.addEventListener("keydown", handleDown);
        window.addEventListener("keyup", handleUp);
  
        return () => {
            window.removeEventListener("keydown", handleDown);
            window.removeEventListener("keyup", handleUp);
        };
    }, []);
  
    return {keyPressed};
}
