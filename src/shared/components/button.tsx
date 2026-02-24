import {type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Tone = 100 | 200 | 500;
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    tone?: Tone;
    size?: Size;
}

const BASE_STYLES =
    "relative cursor-pointer font-semibold transition-all ease-in-out duration-300 rounded-xl";

const SIZE_STYLES: Record<Size, string> = {
    sm: "h-10 !px-4 text-sm",
    md: "h-12 !px-6 text-lg",
    lg: "h-14 !px-8 text-2xl",
};

const COLOR_STYLES: Record<Variant, Record<Tone, string>> = {
    primary: {
        100: "bg-[#A2F2F9] text-primary",
        200: "bg-[#49D5E1] text-primary",
        500: "bg-[#1A7A83] text-white",
    },
    secondary: {
        100: "bg-[#D8E054] text-primary",
        200: "bg-[#B1B83B] text-primary",
        500: "bg-[#73781C] text-white",
    },
};

const SHADOW_STYLES: Record<Variant, string> = {
    primary: "bg-[#D8E054]",
    secondary: "bg-[#FFFAC2]",
};

export default function Button({
    children,
    variant = "primary",
    tone = 500,
    size = "md",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <div className="relative w-full flex items-center justify-center">
            <div
                className={`absolute inset-0 rounded-xl shadow-xl ${SHADOW_STYLES[variant]}`}
            />
            <button
                type={type}
                className={`
            ${BASE_STYLES}
            ${SIZE_STYLES[size]}
            ${COLOR_STYLES[variant][tone]}
            w-full absolute z-10 bottom-[5px] left-[5px]
            hover:left-[7px] hover:bottom-[7px] !py-2
            shadow-2xl
            ${className}
        `}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}