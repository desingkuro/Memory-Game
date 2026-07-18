import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Alert } from "../../../../shared/services/AlertServices";
import { resetPassword } from "../../../../shared/services/Api.services";

interface ForgotPasswordInputs {
    email: string;
}

export default function useForgotPassword() {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInputs>();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data: ForgotPasswordInputs) => {
        setShowLoader(true);
        try {
            await resetPassword(data.email);
            Alert(
                {
                    text: "Te enviamos un correo para recuperar tu contraseña",
                    type: "success"
                },
                enqueueSnackbar
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error al enviar el correo de recuperación";
            Alert(
                {
                    text: message,
                    type: "error"
                },
                enqueueSnackbar
            );
        } finally {
            setShowLoader(false);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        showLoader,
    };
}
