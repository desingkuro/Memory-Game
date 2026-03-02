import Button from "../../../shared/components/button";

interface RickAndMortyModalProps {
    onContinue: () => void;
}

export default function RickAndMortyModal({
    onContinue,
}: RickAndMortyModalProps) {

    return (
        <div>

            {/* Icono / ilustración */}
            <div className="!mb-4 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#DDFCFB]">
                    <span className="text-4xl">🛸</span>
                </div>
            </div>

            {/* Título */}
            <h2 className="!mb-3 text-center text-2xl font-extrabold text-[#00B5CC]">
                ¡Bienvenido al juego de memoria de Rick y Morty!
            </h2>

            {/* Texto descriptivo */}
            <p className="!mb-2 text-center text-sm text-[#4A4A4A]">
                Al presionar el botón <span className="font-semibold">Jugar</span> podrás comenzar la partida.
            </p>
            <p className="!mb-2 text-center text-sm text-[#4A4A4A]">
                Primero se barajan las tarjetas de personajes y te serán presentadas durante{" "}
                <span className="font-semibold">3 segundos</span>. Luego se voltearán y podrás comenzar el juego.
            </p>
            <p className="!mb-4 text-center text-sm text-[#4A4A4A]">
                Consigue el mayor puntaje y la menor cantidad de errores. <span className="font-semibold">¡Buena suerte, jugador!</span>
            </p>

            {/* Botón principal */}
            <div className="!mb-2 flex justify-center">
                <Button
                    type="button"
                    onClick={onContinue}
                    size="lg"
                    variant="primary"
                    className="!px-10"
                >
                    Continuar
                </Button>
            </div>
        </div>
    );
}
