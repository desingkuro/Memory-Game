import { useEffect, useState } from "react";
import { RxCounterClockwiseClock } from "react-icons/rx";
import type { ToastProps } from "../types/toast";



const positionClasses: Record<ToastProps["position"], string> = {
    topLeft: "top-4 left-4",
    topRight: "top-4 right-4",
    bottomLeft: "bottom-4 left-4",
    bottomRight: "bottom-4 right-4",
};

export default function Toast({
    count,
    visible,
    position,
    message,
}: ToastProps) {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (!visible) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setExiting(true);
            const timer = setTimeout(() => setExiting(false), 300);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible && !exiting) return null;

    return (
        <div
            className={`
        fixed z-50 w-80 rounded-xl bg-white shadow-2xl border border-[#00B5CC]
        overflow-hidden ${positionClasses[position]}
        ${visible
                    ? "animate-slideIn"
                    : "animate-slideOut"
                }
      `}
        >
            <div className="!pr-6 h-[60px] flex items-center gap-2">
                {/* Icono */}
                <div className="w-[20%] h-full flex justify-center items-center rounded-xl bg-[#00B5CC]/10">
                    <RxCounterClockwiseClock size={24} color="#00B5CC" />
                </div>

                {/* Contenido */}
                <div className="flex items-center gap-2 flex-1">
                    <div className="h-8 w-8 rounded-full bg-[#00B5CC]/10 flex items-center justify-center ring-2 ring-[#00B5CC]/30">
                        <span className="text-xl font-bold text-[#00B5CC]">{count}</span>
                    </div>
                    <span className="font-semibold text-[#1b1b1b] flex-1">{message}</span>
                </div>
            </div>
        </div>
    );
}
