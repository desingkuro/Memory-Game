import { Link } from "react-router";
import useForgotPassword from "./hook/useForgotPassword";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/button";
import Loader from "../../../shared/components/Loader";
import ContainerLayout from "../../../shared/components/ContainerLayout";
import { FaArrowLeft } from "react-icons/fa";
import logotipo from "../../../assets/img/logo.webp"

export default function ForgotPassword() {
    const { register, handleSubmit, errors, onSubmit, showLoader } = useForgotPassword();

    if (showLoader) return <Loader />;

    return (
        <ContainerLayout>
            <div className="h-dvh w-full flex items-center justify-center bg-primary !p-4 animate-slideIn-long">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[612px] h-[500px] sm:h-[420px] bg-secondary rounded-xl flex flex-col items-center justify-center gap-4 overflow-hidden !m-4 sm:!m-8 !p-6 sm:!p-8">
                    <picture className="h-[25%] w-full flex items-center justify-center">
                        <img fetchPriority="high" src={logotipo} alt="Logotipo" className="object-contain w-[100%] h-[100%]" />
                    </picture>
                    <h2 className="text-xl font-bold">Recuperar contraseña</h2>

                    <main className="w-full h-[70%] flex flex-col items-center  gap-6">
                        <p className="text-sm text-gray-400 w-full sm:w-[80%]">
                            Ingresa tu correo y te enviaremos un enlace para recuperar tu acceso.
                        </p>

                        <Input
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
                        <div className="w-full sm:w-[80%]">
                            <Button className="w-full text-sm sm:text-xl" type="submit">Enviar correo de recuperación</Button>
                        </div>
                    </main>

                    <Link to="/login" className="text-sm flex font-bold !mb-4 items-center gap-2 text-gray-800 hover:text-gray-600 transition-all ease-in-out duration-300">
                        <FaArrowLeft size={20} /> Volver al inicio de sesión
                    </Link>
                </form>
            </div>
        </ContainerLayout>
    );
}
