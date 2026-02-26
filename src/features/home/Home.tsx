import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";
import type { Character } from "../../shared/types/apiInterface";
import Card from "./components/Card";
import './styles/Home.css';
import useGame from "./hooks/useGame";
import RickAndMortyModal from "./components/RickAndMortyModal";
import Toast from "../../shared/components/Toast";
import GameWinSection from "./components/GameWinSection";

export default function Home() {

    const {
        characters,
        handleGame,
        state,
        handlePlay,
        viewModal,
        setViewModal,
        seconds,
        isRunning,
        successes,
        turns } = useGame();

    return (
        <div className="w-full h-full flex justify-center items-center  !p-2 rounded-2xl">
            <section className="w-[70%] min-w-[1024px] bg-secondary rounded-2xl !py-4 !px-[50px] h-full flex flex-col justify-center items-center gap-2">
                <HeaderHome state={state} successes={successes} turns={turns} />
                <main className="w-[100%] h-[850px] grid grid-cols-4 grid-rows-3 gap-8 home-main-scroll">
                    {
                        characters.map((character: Character, index: number) => {
                            return (
                                <Card key={character.uniqueId} onClick={() => {state === "game" && handleGame(character, index) }} character={character} />
                            )
                        })
                    }
                </main>
                {isRunning && <Toast
                    count={seconds}
                    visible={isRunning}
                    position="topRight"
                    message="Segundos"
                />}

                <GameWinSection
                    visible={state === "win"}
                    turns={turns}
                    onRestart={()=>{}}
                    onHome={()=>{}}
                />

                <RickAndMortyModal
                    open={viewModal}
                    onContinue={() => setViewModal(false)}
                />
                <FooterHome onClick={handlePlay} stateGame={state} />
            </section>
        </div>
    );
}
