import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { PostData } from "../../../shared/services/Api.services";
import { useSnackbar } from "notistack";
import { Alert } from "../../../shared/services/AlertServices";

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

    const onSubmit = async (data: LoginFormInputs) => {
        setShowLoader(true);
        const success = await signIn(data.email, data.password, enqueueSnackbar);
        if (success) {
            navigate('/');
        }
        setShowLoader(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function signIn(
        email: string,
        password: string,
        enqueueSnackbar: any
    ): Promise<boolean> {
        try {
            const data = {
                email,
                password: btoa(password)
            }
            const response = await PostData({ path: 'login', type: 'auth', data });
            if (response.code === 200) {
                Alert(
                    {
                        text: "Sesión iniciada correctamente",
                        type: "success",
                    },
                    enqueueSnackbar
                );
                return true;
            }
            return false;
        } catch (error: any) {
            Alert(
                {
                    text: "Error al iniciar sesión, verifique el usuario o contraseña",
                    type: "error",
                },
                enqueueSnackbar
            );
            console.error("Error signing in:", error.code, error.message);
            return false;
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