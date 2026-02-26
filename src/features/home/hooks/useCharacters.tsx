import { useEffect, useState } from "react";
import type { Character, CharactersResponse } from "../../../shared/types/apiInterface";
import { GetData } from "../../../shared/services/Api.services";
import { getUUID } from "../../../shared/services/UUID";

export default function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [cards, setCards] = useState<Character[]>([]);

    useEffect(() => {
        const getCharacters = async () => {
            const response: CharactersResponse = await GetData({ path: 'character', type: 'game' });
            setCards(response.results);
            const sixCards = getSixCards(response.results);
            const pairs = buildPairs(sixCards);
            setCharacters(pairs);
        }
        getCharacters();
    }, [])

    const shuffle = <T,>(arr: T[]): T[] => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const getSixCards = (cards: Character[]) => shuffle(cards).slice(0, 6);

    const buildPairs = (cards: Character[]) => {
        const duplicated = cards.flatMap(card => [
            { ...card, state: true, uniqueId: getUUID() },
            { ...card, state: true, uniqueId: getUUID() },
        ]);

        return shuffle(duplicated);
    };

    const handleCardClick = (index: number) => {
        setCharacters(prev => {
            const newCharacters = [...prev];
            newCharacters[index] = {
                ...newCharacters[index],
                state: !newCharacters[index].state
            };
            return newCharacters;
        });
    };

    const changeStateCharacters = () => {
        setCharacters(prev => {
            const newCharacters = [...prev].map((e) => ({ ...e, state: !e.state }));
            return newCharacters;
        });
    }

    const toggleCharactersById = (charactersArray: Character[]) => {
        if (!charactersArray.length) return;

        const idsToToggle = new Set(charactersArray.map(c => c.uniqueId));
        setCharacters(prev =>
            prev.map(char =>
                idsToToggle.has(char.uniqueId)
                    ? { ...char, state: !char.state }
                    : char
            )
        );
    };


    const deletCharactersForIndex = (id: number) => {
        setCharacters(prev => prev.filter((e) => e.id !== id));
    }

    const initShuffle = () => {
        const sixCards = getSixCards(cards);
        const pairs = buildPairs(sixCards);
        setCharacters(pairs);
        const timer = setTimeout(() => {
            changeStateCharacters();
        }, 3000);
        return () => clearTimeout(timer);
    }


    return {
        characters,
        handleCardClick,
        changeStateCharacters,
        toggleCharactersById,
        initShuffle,
        setCharacters,
        deletCharactersForIndex
    }
}