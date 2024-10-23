import { SkillProps } from '@renderer/hook/useSkill';
import { atom } from 'recoil';

export const InitialGameVariable : gameVariableProps = {
    ScoreRatio : 100,
    DamageRatio: 0.5,
    ExpRatio: 1,
    MenuCount: 3,
    DefaultTime: 120,
    AdditionalTime: 0,

    ExpFormula: x => 1.5*x*x + 2.5*x + 15,
};
export const gameVariableAtom = atom<gameVariableProps>({
    key: "gameVariableAtom",
    default: InitialGameVariable,
})



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
    AdditionalTime: number,

    ExpFormula: (x: number) => number,
}


export const gamePhaseAtom = atom<GamePhase>({
    key: "gameStateAtom",
    default: GamePhase.preGame,
});


export enum languageType{
    react_tsx = "React and TypeScript",
    python = "python"
}
export interface gameMetaProps{
    language: languageType,
    score: number,
    ownedSkill: SkillProps[],
}
export const InitialGameMeta : gameMetaProps = {
    language: languageType.react_tsx,
    score: 0,
    ownedSkill: [],
}
export const gameMetaAtom = atom<gameMetaProps>({
    key: "gameMetaProps",
    default: InitialGameMeta,
});
