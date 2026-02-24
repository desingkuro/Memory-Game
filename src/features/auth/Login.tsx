import logotipo from "../../assets/img/logo.png"
import Button from "../../shared/components/button"
import Input from "./components/Input"

export default function Login() {
    return (
        <div className="h-dvh w-full flex items-center justify-center bg-primary">
            <form action="" className=" w-[612px] h-[657px] bg-secondary rounded-xl flex flex-col items-center justify-center gap-4 overflow-hidden">
                <picture className="h-[25%] w-full flex items-center justify-center">
                    <img src={logotipo} alt="Logotipo" className="object-contain w-[100%] h-[100%]" />
                </picture>
                <div className="w-full h-[70%] flex flex-col items-center justify-center gap-2">
                    <Input label="Usuario" type="text" id="username" placeholder="Introduce tu usuario" propInput={{}} />
                    <Input label="Contraseña" type="password" id="password" placeholder="Introduce tu contraseña" propInput={{}} />
                    <div className="w-[80%] h-auto flex items-center justify-center !my-4">
                        <Button type="submit" variant="primary" tone={500} className="" >Iniciar Sesión</Button>
                    </div>
                    <a href="#" className="text-tertiary text-2xl">¿Olvidaste tu usuario o contraseña?</a>
                </div>
            </form>
        </div>
    )
}
