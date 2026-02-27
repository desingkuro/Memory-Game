import type { Character } from "../../../shared/types/apiInterface";

export interface GameProp {
    successes:number,
    turns:number,
    state:stateGame,
    characters:Character[],
    resetGame:()=>void,
    handleState:(state:stateGame)=>void,
    handlePlay:()=>void,
    viewModal:boolean,
    setViewModal:(viewModal:boolean)=>void,
    seconds:number,
    isRunning:boolean,
    handleGame:(character:Character,index:number)=>void,
    isBlocked:boolean,
    setIsBlocked:(isBlocked:boolean)=>void
}

export type stateGame = "game" | "characters" | "win";