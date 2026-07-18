import { useCallback, useState } from "react";
import type { GameModals, GameProp, stateGame } from "../types/useGameInterface";
import useCharacters from "./useCharacters";
import type { Character } from "../../../shared/types/apiInterface";
import { useCountdown } from "./useCountDown";

export default function useGame(): GameProp {

    const {
        characters,
        handleCardClick,
        initShuffle,
        deletCharactersForIndex,
        toggleCharactersById,
        changeStateCharacters
    } = useCharacters();
    const { countDown, seconds, isRunning } = useCountdown({ initialSeconds: 3 });

    const [successes, setSuccesses] = useState<number>(0);
    const [turns, setTurns] = useState<number>(0);
    const [state, setState] = useState<stateGame>("characters");
    const [selectedCards, setSelectedCards] = useState<Character | null>(null);
    const [viewModal, setViewModal] = useState<GameModals>({
        welcomeModal: true,
        detailsModal: false
    });
    const [lengthCharacters, setLengthCharacters] = useState<number>(0);
    const [isBlocked, setIsBlocked] = useState<boolean>(false);

    const handleState = (state: stateGame) => {
        setState(state);
    }

    const handlePlay = () => {
        handleState("game");
        setSuccesses(0);
        setTurns(0);
        setSelectedCards(null);
        initShuffle();
        setLengthCharacters(characters.length);
        countDown();
    }

    const resetGame = () => {
        setSuccesses(0);
        setTurns(0);
        setState("characters");
        setSelectedCards(null);
        setViewModal({
            welcomeModal: true,
            detailsModal: false
        });
        initShuffle();
        changeStateCharacters();
    }

    const handleViewDetails = (character:Character) => {
        setViewModal(prev => ({
            ...prev,
            detailsModal: true
        }));
        setSelectedCards(character);
    }

    const closeModalDetails = () => {
        setViewModal(prev => ({
            ...prev,
            detailsModal: false
        }));
        setSelectedCards(null);
    }

    const compareCards = useCallback((c1: Character, c2: Character): boolean => {
        return c1.id === c2.id;
    }, []);

    const handleMatchSuccess = useCallback(() => {
        if (selectedCards === null) return;
        setIsBlocked(true);
        setTimeout(() => {
            deletCharactersForIndex(selectedCards.id);
            setSuccesses(prev => {
                const newCount = prev + 1;
                if (newCount === lengthCharacters / 2) {
                    setState("win");
                }
                return newCount;
            });
            setSelectedCards(null);
            setIsBlocked(false);
        }, 1000);
    }, [selectedCards, deletCharactersForIndex, lengthCharacters]);

    const handleMatchFail = useCallback((character: Character) => {
        if (selectedCards === null) return;
        setIsBlocked(true);
        setTimeout(() => {
            toggleCharactersById([character, selectedCards]);
            setSelectedCards(null);
            setIsBlocked(false);
        }, 1000);
    }, [selectedCards, toggleCharactersById]);

    const handleMatch = useCallback((isMatch: boolean, character: Character) => {
        if (selectedCards === null || isBlocked) return;

        setTurns(prev => prev + 1);

        if (isMatch) {
            handleMatchSuccess();
        } else {
            handleMatchFail(character);
        }
    }, [selectedCards, isBlocked, handleMatchSuccess, handleMatchFail]);

    const handleGame = useCallback((character: Character, index: number) => {
        if (isBlocked) return;
        if (character.uniqueId === selectedCards?.uniqueId) return;
        if (selectedCards === null) setSelectedCards(character);
        if (selectedCards !== null) {
            const isMatch = compareCards(selectedCards, character);
            handleMatch(isMatch, character);
        }
        handleCardClick(index);
    }, [isBlocked, selectedCards, compareCards, handleMatch, handleCardClick]);

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
        isRunning,
        isBlocked,
        setIsBlocked,
        handleViewDetails,
        selectedCards,
        closeModalDetails
    }
}