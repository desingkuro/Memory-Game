import logotipo from "../../assets/img/logo.webp";
import { IoLogOutOutline } from "react-icons/io5";

interface HeaderProp {
    tittle: string;
    logout: () => void;
}

export default function Header({ tittle, logout }: HeaderProp) {
    return (
        <header className="w-full h-auto !py-2 !px-4 flex flex-col justify-center items-center gap-2 !mb-2 relative">

            {/* Botón cerrar sesión — esquina superior derecha */}
            <button
                onClick={logout}
                className="absolute top-8 right-8 flex items-center gap-2 bg-senary hover:bg-red-500/20 border border-transparent hover:border-red-500/40 hover:text-red-400 transition-all ease-in-out duration-300 rounded-2xl !py-1.5 !px-3 cursor-pointer group"
            >
                <span className="text-[13px] font-medium hidden sm:block">
                    Cerrar sesión
                </span>
                <IoLogOutOutline className="text-[18px] group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>

            {/* Logo */}
            <picture className="w-[350px] h-[160px] flex justify-center items-center">
                <img
                    fetchPriority="high"
                    src={logotipo}
                    alt="Logotipo"
                    className="h-full w-full object-fill"
                />
            </picture>

            {/* Título */}
            <div className="w-auto bg-quaternary flex justify-center items-center rounded-3xl !py-1 !px-4">
                <p className="text-nowrap text-[14px] font-semibold">{tittle}</p>
            </div>

        </header>
    );
}
