import logotipo from "../../assets/img/logo.webp"
import Button from "../../shared/components/button"
import ContainerLayout from "../../shared/components/ContainerLayout"
import Input from "./components/Input"
import useLogin from "./hooks/useLogin"
import PasswordToggle from "./components/PasswordToggle"
import Loader from "../../shared/components/Loader"

export default function Login() {
    const {
        register,
        handleSubmit,
        showPassword,
        togglePasswordVisibility,
        errors,
        onSubmit,
        showLoader
    } = useLogin();
    return (
        <ContainerLayout>
            <div className="h-dvh w-full flex items-center justify-center bg-primary !p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[612px] h-[95%] max-h-[657px] bg-secondary rounded-xl flex flex-col items-center justify-center gap-4 overflow-hidden !m-4 sm:!m-8 !p-6 sm:!p-8">
                    <picture className="h-[25%] w-full flex items-center justify-center">
                        <img fetchPriority="high" src={logotipo} alt="Logotipo" className="object-contain w-[100%] h-[100%]" />
                    </picture>
                    <div className="w-full h-[70%] flex flex-col items-center justify-center gap-2">
                        <Input label="Usuario" type="text" id="username" placeholder="Introduce tu usuario" propInput={
                            {
                                ...register('email', {
                                    required: 'El correo es requerido',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'El correo es invalido'
                                    }
                                })
                            }
                        }
                        >
                            {errors.email && (
                                <span className="text-red-500 w-full text-left">{errors.email.message}</span>
                            )}
                        </Input>
                        <Input label="Contraseña" type={showPassword ? "text" : "password"} id="password" placeholder="Introduce tu contraseña" propInput={{
                            ...register('password', {
                                required: 'La contraseña es requerida',
                                minLength: {
                                    value: 6,
                                    message: 'La contraseña debe tener al menos 6 caracteres'
                                }
                            })
                        }} >
                            <PasswordToggle
                                showPassword={showPassword}
                                togglePasswordVisibility={togglePasswordVisibility}
                                hasError={!!errors.password?.message}
                            />
                            {errors.password && (
                                <span className="text-red-500 w-full text-left">{errors.password.message}</span>
                            )}
                        </Input>
                        <div className="w-[80%] h-auto flex items-center justify-center !my-4">
                            <Button type="submit" variant="primary" tone={500}>Iniciar Sesión</Button>
                        </div>
                        <a href="#" className="text-tertiary text-2xl">¿Olvidaste tu usuario o contraseña?</a>
                    </div>
                </form>
            </div >
            {showLoader && <Loader />}
        </ContainerLayout >
    )
}
