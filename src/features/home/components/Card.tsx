import type { Character } from "../../../shared/types/apiInterface"
import '../styles/Card.css'
import backCard from "../../../assets/img/backCard.png"

interface CardProps {
    onClick: () => void,
    character: Character,
}

export default function Card({ onClick, character }: CardProps) {

    return (
        <div
            className="perspective w-[212px] h-[260px] cursor-pointer"
            onClick={onClick}
        >
            <div
                className={`
                    relative w-full h-full rounded-xl transition-transform duration-500 ease-out preserve-3d
                    ${character.state ? "rotate-y-0" : "rotate-y-180"}
                `}
            >

                {/* front card*/}
                <div className="absolute w-full h-full bg-white rounded-xl backface-hidden flex flex-col justify-center items-center gap-2">
                    <picture className="h-[180px] w-[180px] rounded-2xl overflow-hidden">
                        <img
                            src={character.image}
                            alt={'imagen de ' + character.name}
                            className="h-[180px] w-[180px] object-cover"
                        />
                    </picture>

                    <div className="h-[20%] w-full flex flex-col justify-center !px-4 min-w-0">
                        <p className="text-[1rem] font-bold text-primary truncate">
                            {character.name}
                        </p>
                        <span className="text-[0.8rem] text-black">
                            {character.status} - {character.species}
                        </span>
                    </div>
                </div>

                {/* back card */}
                <div className="absolute w-full h-full bg-[#A2F2F9] rounded-xl backface-hidden rotate-y-180 flex items-center justify-center">
                    <img
                        src={backCard}
                        className="object-contain h-[180px] w-[180px]"
                        alt="back card"
                    />
                </div>

            </div>
        </div>
    )
}