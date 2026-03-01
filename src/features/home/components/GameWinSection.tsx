import { MdCelebration, MdReplay } from "react-icons/md";
import Button from "../../../shared/components/button";
import '../styles/GameWinSection.css';
import useConfetti from "../../../shared/hooks/useConfetti";
import { useEffect } from "react";

interface GameWinSectionProps {
    visible: boolean;
    turns: number;
    onRestart: () => void;
    onHome: () => void;
}

export default function GameWinSection({
    visible,
    turns,
    onRestart,
    onHome,
}: GameWinSectionProps) {
    const { launchConfetti } = useConfetti();

    useEffect(() => {
        launchConfetti();
    }, []);

    const handleRestart = () => {
        setTimeout(onRestart, 300);
    };

    const handleHome = () => {
        setTimeout(onHome, 300);
    };

    if (!visible) return null;

    return (
        <section
            className={`
        w-[90%] xl:max-w-md !mx-auto rounded-2xl bg-gradient-to-br from-[#FFF8B8] to-[#FFF2A8] !p-8 shadow-2xl border-4 border-[#00B5CC]
        ${visible ? "animate-scaleIn" : "animate-scaleOut"}
      `}
        >
            <div className="!mb-6 flex justify-center">
                <div className="relative">
                    <div className="h-24 w-24 rounded-2xl bg-[#00B5CC] !p-4 shadow-lg">
                        <MdCelebration size={48} className="text-white animate-pulse" />
                    </div>
                    <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full bg-green-400 flex items-center justify-center shadow-md">
                        <span className="text-lg font-bold text-white">✓</span>
                    </div>
                </div>
            </div>

            <h2 className="!mb-2 text-center text-3xl font-black text-[#051622]">
                ¡Felicitaciones!
            </h2>

            <p className="!mb-8 text-center text-xl font-semibold text-[#00B5CC]">
                Terminaste el juego con <span className="text-2xl">{turns}</span> turnos
            </p>

            <div className="flex gap-4 xl:flex-row flex-col justify-center">
                <Button
                    onClick={handleRestart}
                    size="md"
                    variant="primary"
                    tone={100}
                    className="flex items-center justify-center gap-2 font-semibold"
                >
                    <MdReplay size={25} className="font-bold" />
                    Repetir
                </Button>

                <Button
                    onClick={handleHome}
                    size="md"
                    variant="secondary"
                    tone={200}
                    className="flex items-center justify-center gap-2 font-semibold"
                >
                    Inicio
                </Button>
            </div>
        </section>
    );
}
