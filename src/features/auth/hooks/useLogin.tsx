import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { PostData } from "../../../shared/services/Api.services";
import { useSnackbar } from "notistack";
import { Alert } from "../../../shared/services/AlertServices";
import { AuthContext } from "../../../shared/context/AuthContext";

interface LoginFormInputs {
    email: string;
    password: string;
}

export default function useLogin() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const { setUser } = useContext(AuthContext);

    const onSubmit = async (data: LoginFormInputs) => {
        setShowLoader(true);
        await signIn(data.email, data.password, enqueueSnackbar);
        setShowLoader(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function signIn(
        email: string,
        password: string,
        enqueueSnackbar: any
    ) {
        try {
            const data = {
                user: email,
                password: password
            }
            const response = await PostData({ path: 'auth/login', type: 'auth', data });
            if (response.status === 'success') {
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('user', JSON.stringify(response.user));
                setUser(response.user);
                Alert(
                    {
                        text: "Sesión iniciada correctamente",
                        type: "success",
                    },
                    enqueueSnackbar
                );
                navigate('/');
            }
        } catch (error: any) {
            Alert(
                {
                    text: "Error al iniciar sesión, verifique el usuario o contraseña",
                    type: "error",
                },
                enqueueSnackbar
            );
            console.error("Error signing in:", error.code, error.message);
        }
    }


    return {
        register,
        togglePasswordVisibility,
        handleSubmit,
        errors,
        onSubmit,
        showPassword,
        showLoader
    }
}