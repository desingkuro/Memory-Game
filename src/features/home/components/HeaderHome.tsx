import type { stateGame } from "../types/useGameInterface";
interface HeaderHomeProps {
    state: stateGame;
    successes: number;
    turns: number;
}

export default function HeaderHome({ state, successes = 0, turns = 0 }: HeaderHomeProps) {
    const styleText = 'font-semibold xl:text-2xl text-xl';
    return (
        <header className="w-full flex justify-between items-center xl:!py-2 !py-4 h-[60px] ">
            {
                state === 'characters' ?
                    (<p className={styleText} >Personajes</p>)
                    : (<>
                        <p className={styleText}>Aciertos: {successes}</p>
                        <p className={styleText}>Turnos: {turns}</p>
                    </>)
            }
        </header>
    );
}