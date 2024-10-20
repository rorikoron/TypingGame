import { atom } from 'recoil';

export const InitialGameVariable = {
    ScoreRatio : 1,
    DamageRatio: 0.5,
    ExpRatio: 1,
    MenuCount: 3,
    DefaultTime: 120,

    ExpFormula: x => 1.5*x*x + 2.5*x + 15,
};

export enum GamePhase {
    preGame,
    inGame,
    inGame__LevelUp,
    postGame,
}

export interface gameVariableProps{
    ScoreRatio: number,
    DamageRatio: number,
    ExpRatio: number,
    MenuCount: number,
    DefaultTime: number,

    ExpFormula: (x: number) => number,
    
}

export const gamePhaseAtom = atom<GamePhase>({
    key: "gameStateAtom",
    default: GamePhase.preGame,
});


export const ownedSkillAtom = atom<string[]>({
    key: "ownedSkillAtom",
    default: [],
});


export const gameVariableAtom = atom<gameVariableProps>({
    key: "gameVariableAtom",
    default: InitialGameVariable,
})