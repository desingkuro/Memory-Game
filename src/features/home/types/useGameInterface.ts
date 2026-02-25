import type { Character } from "../../../shared/types/apiInterface";

export interface GameProp {
    successes:number,
    turns:number,
    state:stateGame,
    characters:Character[],
    handleCardClick:(index:number)=>void
}

export type stateGame = "game" | "characters";