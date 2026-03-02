import { IoMdClose } from "react-icons/io";

interface ModalProps {
    open: boolean;
    onCancel?: () => void;
    children: React.ReactNode;
}

export default function Modal({
    open,
    onCancel,
    children,
}: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-black/40 animate-scaleIn">

            {/* Contenedor del modal */}
            <div className=" xl:max-w-md w-[340px] sm:w-[440px] relative rounded-2xl bg-[#FFFDF5] !px-10 !py-8 shadow-2xl animate-scaleIn">

                {/* Contenido del modal */}
                {children}

                {/* Acción secundaria (opcional) */}
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="!mx-auto absolute top-4 right-4 block text-4xl font-bold text-[#f03e3e] hover:text-[#f21616] hover:scale-110 transition-all ease-in-out cursor-pointer"
                    >
                        <IoMdClose />
                    </button>
                )}
            </div>
        </div>
    );
}
