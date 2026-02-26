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
        resetGame,
        turns } = useGame();

    const handleCardClick = (character: Character, index: number) => {
        state === "game" && handleGame(character, index)
    }

    return (
        <div className="w-full h-full flex justify-center items-center  !p-2 rounded-2xl">
            <section className="w-[70%] min-w-[1024px] bg-secondary rounded-2xl !py-4 !px-[50px] h-full flex flex-col justify-center items-center gap-2">
                <HeaderHome state={state} successes={successes} turns={turns} />
                <main className={"w-[100%] h-[850px] gap-8 home-main-scroll" + (state === "win" ? " flex items-center justify-center h-[500px] " : " grid grid-cols-4 grid-rows-3")}>
                    {
                        state !== "win" && characters.map((character: Character, index: number) => {
                            return (
                                <Card key={character.uniqueId} onClick={() => { handleCardClick(character, index) }} character={character} />
                            )
                        })
                    }
                    {state === "win" && <GameWinSection
                        visible={state === "win"}
                        turns={turns}
                        onRestart={handlePlay}
                        onHome={resetGame}
                    />}
                </main>
                {isRunning && <Toast
                    count={seconds}
                    visible={isRunning}
                    position="topRight"
                    message="Segundos"
                />}


                <RickAndMortyModal
                    open={viewModal}
                    onContinue={() => setViewModal(false)}
                />
                <FooterHome onClick={handlePlay} stateGame={state} />
            </section>
        </div>
    );
}
