import { useEffect, useState } from "react";
import type { Character, CharactersResponse } from "../../../shared/types/apiInterface";

export default function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [cards, setCards] = useState<Character[]>([]);

    useEffect(() => {
        setCharacters(cards.map((e) => { return { ...e, state: false } }));
    }, [])

    const getCards = () => {
        return cards;
    }

    const handleCardClick = (index: number) => {
        const newCharacters = [...characters];
        newCharacters[index].state = !newCharacters[index].state;
        setCharacters(newCharacters);
    }

    return {
        characters,
        handleCardClick
    }
}