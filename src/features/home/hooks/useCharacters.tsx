import { useCallback, useEffect, useState } from "react";
import type { Character, CharactersResponse } from "../../../shared/types/apiInterface";
import { GetData } from "../../../shared/services/Api.services";
import { getUUID } from "../../../shared/services/UUID";

export default function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [cards, setCards] = useState<Character[]>([]);

    const shuffle = useCallback(<T,>(arr: T[]): T[] => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }, []);

    const getSixCards = useCallback((cards: Character[]) =>
        shuffle(cards).slice(0, 6), [shuffle]);

    const buildPairs = useCallback((cards: Character[]) => {
        const duplicated = cards.flatMap(card => [
            { ...card, state: true, uniqueId: getUUID(), delete: false },
            { ...card, state: true, uniqueId: getUUID(), delete: false },
        ]);
        return shuffle(duplicated);
    }, [shuffle]);

    useEffect(() => {
        const getCharacters = async () => {
            const response = await GetData<CharactersResponse>({ path: 'character', type: 'game' });
            setCards(response.results);
            const sixCards = getSixCards(response.results);
            const pairs = buildPairs(sixCards);
            setCharacters(pairs);
        }
        getCharacters();
    }, [getSixCards, buildPairs]);

    const handleCardClick = useCallback((index: number) => {
        setCharacters(prev => {
            const newCharacters = [...prev];
            newCharacters[index] = {
                ...newCharacters[index],
                state: !newCharacters[index].state
            };
            return newCharacters;
        });
    }, []);

    const changeStateCharacters = useCallback(() => {
        setCharacters(prev => prev.map(e => ({ ...e, state: !e.state })));
    }, []);

    const toggleCharactersById = useCallback((charactersArray: Character[]) => {
        if (!charactersArray.length) return;
        const idsToToggle = new Set(charactersArray.map(c => c.uniqueId));
        setCharacters(prev =>
            prev.map(char =>
                idsToToggle.has(char.uniqueId)
                    ? { ...char, state: !char.state }
                    : char
            )
        );
    }, []);

    const deletCharactersForIndex = useCallback((id: number) => {
        setCharacters(prev => prev.map(e =>
            e?.id === id ? { ...e, delete: true } : e
        ) as Character[]);
    }, []);

    const initShuffle = useCallback(() => {
        const sixCards = getSixCards(cards);
        const pairs = buildPairs(sixCards);
        setCharacters(pairs);
        const timer = setTimeout(() => {
            changeStateCharacters();
        }, 3000);
        return () => clearTimeout(timer);
    }, [cards, getSixCards, buildPairs, changeStateCharacters]);


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