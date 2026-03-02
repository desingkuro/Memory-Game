import type { Character } from "../../../shared/types/apiInterface";

export interface GameProp {
    successes:number,
    turns:number,
    state:stateGame,
    characters:Character[],
    resetGame:()=>void,
    handleState:(state:stateGame)=>void,
    handlePlay:()=>void,
    viewModal:GameModals,
    setViewModal:(viewModal:GameModals)=>void,
    seconds:number,
    isRunning:boolean,
    handleGame:(character:Character,index:number)=>void,
    isBlocked:boolean,
    setIsBlocked:(isBlocked:boolean)=>void,
    handleViewDetails:(character:Character)=>void,
    selectedCards:Character | null
}

export interface GameModals{
    welcomeModal:boolean;
    detailsModal:boolean;
}

export type stateGame = "game" | "characters" | "win";