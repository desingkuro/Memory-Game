import { Outlet } from "react-router";
import ContainerLayout from "../../shared/components/ContainerLayout";

export default function AuthLayout(){
    return(
        <ContainerLayout>
            <Outlet/>
        </ContainerLayout>
    )
}