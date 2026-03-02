import type { Character } from "../../../shared/types/apiInterface";

interface CharacterDetailsProps {
    character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
    if (!character) return null;
    return (
        <section className="w-full max-w-[520px] flex flex-col items-center justify-center gap-4">
            <picture className="w-full max-w-[260px] aspect-square overflow-hidden rounded-2xl bg-white">
                <img
                    fetchPriority="high"
                    src={character?.image || ""}
                    alt={"imagen de " + character?.name}
                    className="w-full h-full object-cover"
                />
            </picture>

            <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
                    {character.name}
                </h2>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-white/70 rounded-xl !p-3">
                        <p className="text-xs text-black/60">Estado</p>
                        <p className="text-sm font-semibold text-black">{character.status}</p>
                    </div>

                    <div className="bg-white/70 rounded-xl !p-3">
                        <p className="text-xs text-black/60">Especie</p>
                        <p className="text-sm font-semibold text-black">{character.species}</p>
                    </div>

                    <div className="bg-white/70 rounded-xl !p-3">
                        <p className="text-xs text-black/60">Género</p>
                        <p className="text-sm font-semibold text-black">{character.gender}</p>
                    </div>

                    <div className="bg-white/70 rounded-xl !p-3">
                        <p className="text-xs text-black/60">Tipo</p>
                        <p className="text-sm font-semibold text-black">{character.type || "N/A"}</p>
                    </div>

                    <div className="bg-white/70 rounded-xl !p-3">
                        <p className="text-xs text-black/60">Origen</p>
                        <p className="text-sm font-semibold text-black">{character.origin?.name || "N/A"}</p>
                    </div>

                    <div className="bg-white/70 rounded-xl !p-3">
                        <p className="text-xs text-black/60">Ubicación</p>
                        <p className="text-sm font-semibold text-black">{character.location?.name || "N/A"}</p>
                    </div>
                </div>

                <div className="w-full bg-white/70 rounded-xl !p-3">
                    <p className="text-xs text-black/60">Episodios</p>
                    <p className="text-sm font-semibold text-black">
                        {Array.isArray(character.episode) ? character.episode.length : 0}
                    </p>
                </div>
            </div>
        </section>
    );
}
