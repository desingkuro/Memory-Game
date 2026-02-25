import { useState } from "react";
import type { GameProp, stateGame } from "../types/useGameInterface";
import useCharacters from "./useCharacters";

export default function useGame():GameProp{

    const {characters,handleCardClick} = useCharacters();

    const [successes,setSuccesses] = useState<number>(0);
    const [turns,setTurns] = useState<number>(0);
    const [state,setState] = useState<stateGame>("characters");

    const handleState = (state:stateGame) => {
        setState(state);
    }

    const incrementTurns = () => {
        setTurns(turns + 1);
    }

    const incrementSuccesses = () => {
        setSuccesses(successes + 1);
    }
    
    const resetGame = () => {
        setSuccesses(0);
        setTurns(0);
        setState("characters");
    }
    
    return {
        successes,
        turns,
        state,
        characters,
        handleCardClick
    }
}