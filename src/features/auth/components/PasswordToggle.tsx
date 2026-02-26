import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function PasswordToggle({ showPassword, togglePasswordVisibility, hasError }: {
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    hasError: boolean;
}) {
    return (
        <span
            onClick={togglePasswordVisibility}
            className={`
      absolute right-5 cursor-pointer bottom-10
      ${hasError ? 'bottom-[3.8rem]' : 'bottom-[1.8rem]'}
      transition-all duration-100 hover:scale-110
    `}
        >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </span>
    )
};