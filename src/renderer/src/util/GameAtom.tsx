import { atom } from 'recoil';


export enum GamePhase {
    preGame,
    inGame,
    postGame,
}

export const gamePhaseAtom = atom<GamePhase>({
    key: "gameStateAtom",
    default: GamePhase.preGame,
});
