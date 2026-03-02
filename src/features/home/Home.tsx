import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";
import type { Character } from "../../shared/types/apiInterface";
import Card from "./components/Card";
import useGame from "./hooks/useGame";
import RickAndMortyModal from "./components/RickAndMortyModal";
import Toast from "../../shared/components/Toast";
import GameWinSection from "./components/GameWinSection";
import './styles/Home.css';
import Modal from "../../shared/components/Modal";
import CharacterDetails from "./components/CharacterDetails";

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
        handleViewDetails,
        selectedCards,
        closeModalDetails,
        turns } = useGame();

    const handleCardClick = (character: Character, index: number) => {
        state === "game" && handleGame(character, index);
        state === "characters" && handleViewDetails(character);
    }

    return (
        <div className="w-full h-full flex justify-center items-center !p-2 rounded-2xl">
            <section className="w-[95%] xl:max-w-[1024px] bg-secondary rounded-2xl !py-4 xl:!px-[50px] !px-2 h-full flex flex-col justify-center items-center gap-2">
                <HeaderHome state={state} successes={successes} turns={turns} />
                <main
                    className={
                        "w-full min-w-[300px] xl:min-w-[1024px] home-main-scroll grid gap-2 sm:gap-4 animate-slideIn-long " +
                        (state === "win"
                            ? "grid-cols-1 place-items-center min-h-[380px]"
                            : "grid grid-cols-4 grid-rows-2 justify-items-center")
                    }
                >
                    {state !== "win" &&
                        characters.map((character: Character, index: number) => (
                            <Card
                                key={character.uniqueId}
                                onClick={() => handleCardClick(character, index)}
                                character={character}
                            />
                        ))}

                    {state === "win" && (
                        <GameWinSection
                            visible={state === "win"}
                            turns={turns}
                            onRestart={handlePlay}
                            onHome={resetGame}
                        />
                    )}
                </main>

                {/* Toast */}
                {isRunning && <Toast
                    count={seconds}
                    visible={isRunning}
                    position="topRight"
                    message="Segundos"
                />}

                {/* Modal de bienvenida */}
                <Modal
                    open={viewModal.welcomeModal}
                >
                    <RickAndMortyModal
                        onContinue={() => setViewModal({ welcomeModal: false, detailsModal: false })}
                    />
                </Modal>

                {/* Modal de detalles */}
                <Modal
                    open={viewModal.detailsModal}
                    onCancel={closeModalDetails}
                >
                    <CharacterDetails
                        character={selectedCards!}
                    />
                </Modal>

                {/* Footer */}
                {state === "characters" && <FooterHome onClick={handlePlay} stateGame={state} />}
            </section>
        </div>
    );
}
