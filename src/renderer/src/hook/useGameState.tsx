import { useState } from "react";

export enum GameStatus {
    preGame,
    inGame,
    postGame,
}
export default function useGameState(){
    

    const [gameState, setGameState] = useState<GameStatus>(GameStatus.preGame);
    
    return {gameState, setGameState};
}