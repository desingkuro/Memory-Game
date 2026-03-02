import { Link } from "react-router";
import useForgotPassword from "./hook/useForgotPassword";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/button";
import Loader from "../../../shared/components/Loader";
import ContainerLayout from "../../../shared/components/ContainerLayout";
import { FaArrowLeft } from "react-icons/fa";

export default function ForgotPassword() {
    const { register, handleSubmit, errors, onSubmit, showLoader } = useForgotPassword();

    if (showLoader) return <Loader />;

    return (
        <ContainerLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">Recuperar contraseña</h2>
                <p className="text-sm text-gray-400">
                    Ingresa tu correo y te enviaremos un enlace para recuperar tu acceso.
                </p>

                <Input
                    label="Correo electrónico"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    id="email"
                    propInput={register("email", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Correo no válido",
                        },
                    })}
                >
                    {errors?.email && (
                        <span className="text-red-500 w-full text-left">{errors.email.message}</span>
                    )}
                </Input>

                <Button type="submit">Enviar correo de recuperación</Button>

                <Link to="/login" className="text-sm flex items-center gap-2 text-gray-400 hover:text-white">
                    <FaArrowLeft size={20}/> Volver al inicio de sesión
                </Link>
            </form>
        </ContainerLayout>
    );
}
