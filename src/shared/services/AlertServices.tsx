type propsAlert = {
    text:string,
    type: "success" | "error" | "default" | "warning" | "info" | undefined,
}

export function Alert({text,type='success'}:propsAlert,enqueueSnackbar:any){
    enqueueSnackbar(text,{
        variant:type
    });
}