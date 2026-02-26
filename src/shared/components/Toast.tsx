import { useEffect, useState } from "react";
import { RxCounterClockwiseClock } from "react-icons/rx";
import type { animationState, ToastProps } from "../types/toast";



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
    const [animationState, setAnimationState] = useState<animationState>("idle");

    useEffect(() => {
        if (visible) {
            setAnimationState("entering");
        } else {
            setAnimationState("exiting");
            const timer = setTimeout(() => {
                setAnimationState("idle");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (animationState === "idle") return null;

    return (
        <div
            className={`
        fixed z-50 w-80 rounded-xl bg-white shadow-2xl border border-[#00B5CC]
        overflow-hidden ${positionClasses[position]}
        ${animationState === "entering"
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
