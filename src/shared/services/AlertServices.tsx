import type { OptionsObject } from "notistack";

type propsAlert = {
    text:string,
    type: "success" | "error" | "default" | "warning" | "info",
}

export function Alert({text,type='success'}:propsAlert,enqueueSnackbar:(message:string,options?:OptionsObject)=>void){
    enqueueSnackbar(text,{
        variant:type
    });
}