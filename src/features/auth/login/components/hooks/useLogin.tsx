import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginUser } from "../../../../../shared/services/Api.services";
import { useSnackbar } from "notistack";
import { Alert } from "../../../../../shared/services/AlertServices";

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
        await signIn(data.email, data.password);
        setShowLoader(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const signIn = async (email: string, password: string) => {
        try {
            const response = await loginUser(email, password);

            if (response.user) {
                Alert(
                    { text: "Sesión iniciada correctamente", type: "success" },
                    enqueueSnackbar
                );
                navigate('/');
            }
        } catch (error: any) {
            Alert(
                {
                    text: error.message || "Error al iniciar sesión, verifique el usuario o contraseña",
                    type: "error",
                },
                enqueueSnackbar
            );
        }
    };



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