type stateGame = "game" | "caracters";
interface HeaderHomeProps {
    state: stateGame;
    successes: number;
    turns: number;
}

export default function HeaderHome({ state, successes = 0, turns = 0 }: HeaderHomeProps) {
    const styleText = 'font-semibold text-lg';
    return (
        <header className="w-full flex justify-between items-center !py-2 h-[60px] ">
            {
                state === 'caracters' ?
                    (<p className={styleText} >Personajes</p>)
                    : (<>
                        <p className={styleText}>Aciertos: {successes}</p>
                        <p className={styleText}>Turnos: {turns}</p>
                    </>)
            }
        </header>
    );
}