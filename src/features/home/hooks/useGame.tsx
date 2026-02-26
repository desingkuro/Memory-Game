import { useState } from "react";
import type { GameProp, stateGame } from "../types/useGameInterface";
import useCharacters from "./useCharacters";
import type { Character } from "../../../shared/types/apiInterface";
import { useCountdown } from "./useCountDown";

export default function useGame(): GameProp {

    const { characters, handleCardClick, initShuffle, deletCharactersForIndex, toggleCharactersById } = useCharacters();
    const { countDown, seconds, isRunning } = useCountdown({ initialSeconds: 3 });

    const [successes, setSuccesses] = useState<number>(0);
    const [turns, setTurns] = useState<number>(0);
    const [state, setState] = useState<stateGame>("characters");
    const [selectedCards, setSelectedCards] = useState<Character | null>(null);
    const [viewModal, setViewModal] = useState<boolean>(true);

    const handleState = (state: stateGame) => {
        setState(state);

    }

    const incrementTurns = () => {
        setTurns(turns + 1);
    }

    const incrementSuccesses = () => {
        setSuccesses(successes + 1);
    }

    const handlePlay = () => {
        handleState("game");
        initShuffle();
        countDown();
    }

    const resetGame = () => {
        setSuccesses(0);
        setTurns(0);
        setState("characters");
    }

    const handleGame = (character: Character, index: number) => {

        if (character.uniqueId === selectedCards?.uniqueId) return;

        if (selectedCards === null) setSelectedCards(character);

        if (selectedCards !== null) {
            const isMatch = compareCards(selectedCards, character);
            handleMatch(isMatch, character);
        };

        handleCardClick(index);
    }

    const compareCards = (character1: Character, character2: Character): boolean => {
        if (character1.id === character2.id) {
            return true;
        }
        return false;
    }

    const handleMatch = (isMatch: boolean, character: Character) => {
        if (selectedCards === null) return;

        incrementTurns();

        if (isMatch) {
            handleMatchSuccess();
            if (successes === characters.length / 2) {
                console.log("ganaste");
                setState("win");
            }
        } else {
            handleMatchFail(character);
        }
    };

    const handleMatchSuccess = () => {
        if (selectedCards === null) return;
        setTimeout(() => {
            deletCharactersForIndex(selectedCards.id);
            incrementSuccesses();
            setSelectedCards(null);
        }, 1000);
    };

    const handleMatchFail = (character: Character) => {
        if (selectedCards === null) return;
        setTimeout(() => {
            toggleCharactersById([character, selectedCards]);
            setSelectedCards(null);
        }, 1000);
    };



    return {
        successes,
        turns,
        state,
        characters,
        handleGame,
        resetGame,
        handleState,
        handlePlay,
        viewModal,
        setViewModal,
        seconds,
        isRunning
    }
}