import type { Character } from "../../../shared/types/apiInterface"
import '../styles/Card.css'
import backCard from "../../../assets/img/backCard.png"

interface CardProps {
    onClick: () => void,
    character: Character | null,
}

export default function Card({ onClick, character }: CardProps) {
    if (character?.delete) {
        return (
            <div className="w-[75px] h-[98px] xs:w-[140px] xs:h-[170px] sm:w-[160px] sm:h-[195px] lg:w-[186px] lg:h-[228px] xl:w-[212px] xl:h-[260px] perspective cursor-pointer" />
        );
    }

    return (
        <div
            className="w-[75px] h-[98px] xs:w-[140px] xs:h-[170px] sm:w-[160px] sm:h-[195px] lg:w-[186px] lg:h-[228px] xl:w-[212px] xl:h-[260px] perspective cursor-pointer"
            onClick={onClick}
        >
            <div
                className={`
          relative w-full h-full rounded-xl transition-transform duration-500 ease-out preserve-3d
          ${character?.state ? "rotate-y-0" : "rotate-y-180"}
        `}
            >
                {/* front card */}
                <div className="absolute inset-0 bg-white rounded-xl backface-hidden flex flex-col justify-center items-center gap-1 !p-1 xs:!p-2 sm:!p-3">
                    <picture className="w-[90%] h-[65%] xl:w-[180px] xl:h-[180px] xs:rounded-2xl rounded-[5px] overflow-hidden xs:!mb-1 sm:!mb-2">
                        <img
                            src={character?.image}
                            alt={'imagen de ' + character?.name}
                            className="w-full h-full object-cover"
                        />
                    </picture>

                    <div className="w-full flex flex-col justify-start !px-1 text-left">
                        <p className="text-[8px] xs:text-xs sm:text-sm xl:text-base truncate font-bold text-primary line-clamp-1">
                            {character?.name}
                        </p>
                        <span className="text-[7px] xs:text-[10px] sm:text-xs xl:text-sm text-black truncate">
                            {character?.status} - {character?.species}
                        </span>
                    </div>
                </div>

                {/* back card */}
                <div className="absolute inset-0 bg-[#A2F2F9] rounded-xl backface-hidden rotate-y-180 flex items-center justify-center !p-1 xs:!p-2 sm:!p-3">
                    <img
                        src={backCard}
                        className="w-[65%] h-[55%] object-contain"
                        alt="back card"
                    />
                </div>
            </div>
        </div>
    );
}



